package side.shopping.shopping_mall_backend.src.domain.elasticsearch.product;

import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.elasticsearch.annotations.Document;
import side.shopping.shopping_mall_backend.src.domain.product.Product;

@Getter
@Setter
@Document(indexName = "products")
@Builder
public class ProductElkDocument {
    @Id
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

    public static ProductElkDocument from (Product product) {
        return ProductElkDocument.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .quantity(product.getQuantity())
                .totalScore(product.getTotalScore())
                .reviewCnt(product.getReviewCnt())
                .rating(product.getRating())
                .sellerId(product.getSellerId())
                .categoryName(product.getCategoryName())
                .build();
    }
}
