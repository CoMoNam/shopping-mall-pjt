package side.shopping.shopping_mall_backend.src.application.dto.product;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class ProductSaveDto {
    @NotEmpty(message = "* 상품명이 필요합니다 *")
    private String name;
    private String description;
    private int price;
    private int quantity;
    @NotEmpty(message = "* 카테고리 선택 필수 *")
    private String categoryName;
}
