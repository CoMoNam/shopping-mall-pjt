package side.shopping.shopping_mall_backend.src.infrastructure.persistence.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import side.shopping.shopping_mall_backend.src.domain.product.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // 검색어 없을때
    Page<Product> findBySellerIdOrderByCreatedAtDesc(Long sellerId, Pageable pageable);
    // 검색어 있을때
    Page<Product> findByNameContainingAndSellerIdOrderByCreatedAtDesc(String name, Long sellerId, Pageable pageable);

}
