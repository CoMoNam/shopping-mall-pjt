package side.shopping.shopping_mall_backend.seller.web;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import side.shopping.shopping_mall_backend.global.enums.Comments;
import side.shopping.shopping_mall_backend.global.enums.EndPoint;
import side.shopping.shopping_mall_backend.seller.application.service.product.ProductService;
import side.shopping.shopping_mall_backend.seller.dto.product.ProductDto;

@RestController
@RequestMapping(value = EndPoint.PRODUCT_CONTROLLER)
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @PostMapping
    public ResponseEntity<String> save(@Valid @RequestBody ProductDto productDto) {
        productService.save(productDto);
        return ResponseEntity.ok(Comments.TRANSACTION_SUCCESS.getDescriptionEn());
    }
}
