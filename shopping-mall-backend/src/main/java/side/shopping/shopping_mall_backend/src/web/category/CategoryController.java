package side.shopping.shopping_mall_backend.src.web.category;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import side.shopping.shopping_mall_backend.global.enums.EndPoint;
import side.shopping.shopping_mall_backend.src.application.service.category.CategoryService;
import side.shopping.shopping_mall_backend.src.domain.category.Category;

import java.util.List;

@RestController
@RequestMapping(value = EndPoint.CATEGORY_CONTROLLER)
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public List<Category> getCategoryList() {
        return categoryService.getCategoryList();
    }
}
