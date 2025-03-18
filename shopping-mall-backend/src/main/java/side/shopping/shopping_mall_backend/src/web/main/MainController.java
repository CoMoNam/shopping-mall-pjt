package side.shopping.shopping_mall_backend.src.web.main;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import side.shopping.shopping_mall_backend.global.enums.EndPoint;
import side.shopping.shopping_mall_backend.src.application.service.main.MainService;
import side.shopping.shopping_mall_backend.src.domain.product.Product;
import java.util.List;
@RestController
@RequestMapping(value = EndPoint.MAIN_CONTROLLER)
@RequiredArgsConstructor
public class MainController {

    private final MainService mainService;
    // 최근 등록된 상품 8개
    @GetMapping("/recent")
    public List<Product> getRecentProductList() {
        return mainService.getReentProductList();
    }
}
