package side.shopping.shopping_mall_backend.src.domain.product;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;
import side.shopping.shopping_mall_backend.global.mvc.domain.jpa.Auditable;

import java.time.LocalDateTime;

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
    private int price;
    @Column(nullable = false)
    private int quantity;
    private int totalScore;
    private int reviewCnt;
    private double rating;
    private Long sellerId;
    private String categoryName;
}
