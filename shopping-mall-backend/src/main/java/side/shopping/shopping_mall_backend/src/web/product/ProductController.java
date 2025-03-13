package side.shopping.shopping_mall_backend.src.web.product;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import side.shopping.shopping_mall_backend.global.enums.Comments;
import side.shopping.shopping_mall_backend.global.enums.EndPoint;
import side.shopping.shopping_mall_backend.src.application.dto.product.ProductUpdateDto;
import side.shopping.shopping_mall_backend.src.application.service.product.ProductService;
import side.shopping.shopping_mall_backend.src.domain.product.Product;
import side.shopping.shopping_mall_backend.src.application.dto.product.ProductSaveDto;


@RestController
@RequestMapping(value = EndPoint.PRODUCT_CONTROLLER)
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    // 상품 기본 CLUD
    @PostMapping
    public ResponseEntity<String> save(@Valid @RequestBody ProductSaveDto productSaveDto) {
        productService.save(productSaveDto);
        return ResponseEntity.ok(Comments.TRANSACTION_SUCCESS.getDescriptionEn());
    }

    @GetMapping
    public Page<Product> getProductList(
            @RequestParam(defaultValue = "") String name,    // 검색 키워드
            @RequestParam(defaultValue = "0") int page,     // 현재 페이지
            @RequestParam(defaultValue = "10") int size     // 페이지 크기
    ) {
        Pageable pageable = PageRequest.of(page, size);     // 페이징 조건 생성
        return productService.getProductList(name, pageable); // 결과 반환
    }

    @DeleteMapping
    public ResponseEntity<String> delete(@RequestParam Long id) {
        productService.delete(id);
        return ResponseEntity.ok(Comments.TRANSACTION_SUCCESS.getDescriptionEn());
    }

    @PutMapping
    public ResponseEntity<String> update(@Valid @RequestBody ProductUpdateDto productUpdateDto) {
        productService.update(productUpdateDto);
        return ResponseEntity.ok(Comments.TRANSACTION_SUCCESS.getDescriptionEn());
    }
}
