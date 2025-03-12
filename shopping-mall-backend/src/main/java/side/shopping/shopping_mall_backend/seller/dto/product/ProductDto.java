package side.shopping.shopping_mall_backend.seller.dto.product;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class ProductDto {
    @NotEmpty(message = "* 상품명이 필요합니다 *")
    private String name;
    private String description;
    private Integer price;
    private Integer quantity;
}
