package side.shopping.shopping_mall_backend.customer.domain.authority;

import jakarta.persistence.*;
import lombok.*;
import side.shopping.shopping_mall_backend.global.domain.jpa.Auditable;
import side.shopping.shopping_mall_backend.global.enums.AuthorityType;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
public class AuthorityRequest extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private AuthorityType authorityType;

    @Column(nullable = false)
    private Long memberId;

    @Column(nullable = false)
    private String value;
}
