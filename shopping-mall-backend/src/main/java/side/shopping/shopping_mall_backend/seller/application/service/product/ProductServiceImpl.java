package side.shopping.shopping_mall_backend.seller.application.service.product;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import side.shopping.shopping_mall_backend.seller.application.mapper.product.ProductMapper;
import side.shopping.shopping_mall_backend.seller.domain.product.Product;
import side.shopping.shopping_mall_backend.seller.dto.product.ProductDto;
import side.shopping.shopping_mall_backend.seller.infrastructure.persistence.product.ProductRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService{
    private final ProductRepository productRepository;

    @Override
    public void save(ProductDto productDto) {
        System.out.println("====>>>> 1" + productDto.getName());
        Product product = ProductMapper.INSTANCE.toProduct(productDto);
        System.out.println("====>>>> 2" + product.getName());
        productRepository.save(product);
    }
}
