package side.shopping.shopping_mall_backend.src.domain.cart;

import jakarta.persistence.*;
import lombok.*;
import side.shopping.shopping_mall_backend.global.mvc.domain.jpa.Auditable;
import side.shopping.shopping_mall_backend.src.domain.product.Product;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
public class CartItem extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    private int quantity;

    // 상품 옵션 (색상, 사이즈 등)
    private String optionValue;
}
