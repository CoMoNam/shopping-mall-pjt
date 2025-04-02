package side.shopping.shopping_mall_backend.src.application.service.product;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import side.shopping.shopping_mall_backend.global.enums.Comments;
import side.shopping.shopping_mall_backend.global.util.security.LoginUserUtil;
import side.shopping.shopping_mall_backend.src.application.dto.product.ProductDetailDto;
import side.shopping.shopping_mall_backend.src.application.dto.product.ProductUpdateDto;
import side.shopping.shopping_mall_backend.src.application.mapper.product.ProductMapper;
import side.shopping.shopping_mall_backend.src.domain.elasticsearch.product.ProductElkDocument;
import side.shopping.shopping_mall_backend.src.domain.product.Product;
import side.shopping.shopping_mall_backend.src.application.dto.product.ProductSaveDto;
import side.shopping.shopping_mall_backend.src.infrastructure.persistence.product.ProductRepository;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService{
    private final ProductRepository productRepository;
    private final LoginUserUtil loginUserUtil;
    private final ElasticsearchClient elasticsearchClient;


    //상품등록
    @Override
    public void save(ProductSaveDto productDto){
        try {
            Product product = ProductMapper.INSTANCE.toProduct(productDto);
            product.setSellerId(loginUserUtil.getCurrentUserId());
            productRepository.save(product);

            ProductElkDocument elkDoc = ProductElkDocument.from(product);
            elasticsearchClient.index(i -> i
                    .index("products")
                    .id(product.getId().toString())
                    .document(elkDoc)
            );
        } catch (IOException e) {
            throw new RuntimeException(Comments.TRANSACTION_FAIL.getDescriptionEn(), e);
        }

    }

    //내 상품 목록조회
    @Override
    public Page<Product> getProductList(String name, Pageable pageable) {
        if (name == null || name.isEmpty()) {
            return productRepository.findBySellerIdOrderByCreatedAtDesc(loginUserUtil.getCurrentUserId(), pageable);
        } else {
            return productRepository.findByNameContainingAndSellerIdOrderByCreatedAtDesc(name, loginUserUtil.getCurrentUserId(), pageable);
        }
    }

    //해당 상품 삭제
    @Override
    public void delete(Long id) {
        try {
            productRepository.deleteById(id);

            elasticsearchClient.delete(d -> d
                    .index("products")
                    .id(id.toString())
            );
        } catch (IOException e) {
            throw new RuntimeException(Comments.TRANSACTION_FAIL.getDescriptionEn(), e);
        }
    }

    @Override
    public void update(ProductUpdateDto productUpdateDto) {
        try {
            Product product = ProductMapper.INSTANCE.toProduct(productUpdateDto);
            productRepository.save(product);

            ProductElkDocument elkDoc = ProductElkDocument.from(product);
            elasticsearchClient.index(i -> i
                    .index("products")
                    .id(product.getId().toString())
                    .document(elkDoc)
            );
        } catch (IOException e) {
            throw new RuntimeException(Comments.TRANSACTION_FAIL.getDescriptionEn(), e);
        }

    }

    @Override
    public ProductDetailDto getProductDetail(Long id) {
        Product product = productRepository.findById(id).orElse(null);
        return ProductMapper.INSTANCE.toProductDetailDto(product);
    }

    //평점 계산
    private double makeRating(int totalScore, int reviewCnt) {
        if (reviewCnt != 0) {
            return (double) totalScore / reviewCnt;
        } else {
            return 0.0;
        }
    }
}
