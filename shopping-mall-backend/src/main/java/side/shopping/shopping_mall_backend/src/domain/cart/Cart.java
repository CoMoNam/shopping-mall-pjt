package side.shopping.shopping_mall_backend.src.domain.cart;

import jakarta.persistence.*;
import lombok.*;
import side.shopping.shopping_mall_backend.global.mvc.domain.jpa.Auditable;
import side.shopping.shopping_mall_backend.src.domain.member.Member;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
public class Cart extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> items = new ArrayList<>();
}
