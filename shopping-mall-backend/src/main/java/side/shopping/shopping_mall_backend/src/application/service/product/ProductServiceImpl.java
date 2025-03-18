package side.shopping.shopping_mall_backend.src.application.service.product;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import side.shopping.shopping_mall_backend.global.util.security.LoginUserUtil;
import side.shopping.shopping_mall_backend.src.application.dto.product.ProductUpdateDto;
import side.shopping.shopping_mall_backend.src.application.mapper.product.ProductMapper;
import side.shopping.shopping_mall_backend.src.domain.product.Product;
import side.shopping.shopping_mall_backend.src.application.dto.product.ProductSaveDto;
import side.shopping.shopping_mall_backend.src.infrastructure.persistence.product.ProductRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService{
    private final ProductRepository productRepository;
    private final LoginUserUtil loginUserUtil;

    //상품등록
    @Override
    public void save(ProductSaveDto productDto) {
        Product product = ProductMapper.INSTANCE.toProduct(productDto);
        product.setSellerId(loginUserUtil.getCurrentUserId());
        productRepository.save(product);
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
        productRepository.deleteById(id);
    }

    @Override
    public void update(ProductUpdateDto productUpdateDto) {
        Product product = ProductMapper.INSTANCE.toProduct(productUpdateDto);
        productRepository.save(product);
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
