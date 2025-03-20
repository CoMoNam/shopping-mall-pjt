package side.shopping.shopping_mall_backend.src.web.elasticsearch;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import side.shopping.shopping_mall_backend.global.enums.EndPoint;
import side.shopping.shopping_mall_backend.src.application.service.elasticsearch.ProductElkService;
import side.shopping.shopping_mall_backend.src.domain.elasticsearch.product.ProductElkDocument;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(EndPoint.PRODUCT_ELK_CONTROLLER)
@RequiredArgsConstructor
public class ProductElkController {
    private final ProductElkService productElkService;

    @GetMapping
    public List<ProductElkDocument> search(@RequestParam String searchText, int page) throws IOException {
        return productElkService.search(searchText, page);
    }
}
