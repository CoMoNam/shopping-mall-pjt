package side.shopping.shopping_mall_backend.src.infrastructure.persistence.category;

import org.springframework.data.jpa.repository.JpaRepository;
import side.shopping.shopping_mall_backend.src.domain.category.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
