package side.shopping.shopping_mall_backend.src.application.service.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import side.shopping.shopping_mall_backend.src.application.dto.product.ProductUpdateDto;
import side.shopping.shopping_mall_backend.src.domain.product.Product;
import side.shopping.shopping_mall_backend.src.application.dto.product.ProductSaveDto;

/*
    상품 인터페이스
 */
public interface ProductService {
    void save(ProductSaveDto productSaveDto);
    Page<Product> getProductList(String name, Pageable pageable);
    void delete(Long id);
    void update(ProductUpdateDto productUpdateDto);
}
