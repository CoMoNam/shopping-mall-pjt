package side.shopping.shopping_mall_backend.src.domain.product;

import jakarta.persistence.*;
import lombok.*;
import side.shopping.shopping_mall_backend.global.mvc.domain.jpa.Auditable;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
public class Product extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    private String description;
    @Column(nullable = false)
    private Integer price;
    @Column(nullable = false)
    private Integer quantity;
    private Integer totalScore;
    private Integer reviewCnt;
    private Double rating;
    private Long sellerId;
}
