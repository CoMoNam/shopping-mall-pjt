package side.shopping.shopping_mall_backend.seller.domain.product;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import side.shopping.shopping_mall_backend.global.domain.jpa.Auditable;

@Entity
@NoArgsConstructor // 기본 생성자를 생성
@AllArgsConstructor // 모든 필드를 매개변수로 받는 생성자를 생성
@ToString
@Getter
public class Product extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private int price;
    private int quantity;
}
