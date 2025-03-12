package side.shopping.shopping_mall_backend.seller.infrastructure.persistence.product;

import org.springframework.data.jpa.repository.JpaRepository;
import side.shopping.shopping_mall_backend.seller.domain.product.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
