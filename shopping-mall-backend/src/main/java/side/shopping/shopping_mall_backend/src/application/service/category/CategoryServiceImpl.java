package side.shopping.shopping_mall_backend.src.application.service.category;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import side.shopping.shopping_mall_backend.src.domain.category.Category;
import side.shopping.shopping_mall_backend.src.infrastructure.persistence.category.CategoryRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public List<Category> getCategoryList() {
        return categoryRepository.findAll();
    }
}
