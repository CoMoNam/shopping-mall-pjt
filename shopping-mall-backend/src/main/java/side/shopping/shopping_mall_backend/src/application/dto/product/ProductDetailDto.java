package side.shopping.shopping_mall_backend.src.application.dto.product;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProductDetailDto {
    private Long id;
    private String name;
    private String description;
    private int price;
    private int quantity;
    private int totalScore;
    private int reviewCnt;
    private double rating;
    private Long sellerId;
    private String categoryName;
}
