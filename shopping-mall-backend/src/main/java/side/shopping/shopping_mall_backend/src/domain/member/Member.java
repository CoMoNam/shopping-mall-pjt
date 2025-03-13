package side.shopping.shopping_mall_backend.src.domain.member;

import jakarta.persistence.*;
import lombok.*;
import side.shopping.shopping_mall_backend.global.mvc.domain.jpa.Auditable;
import side.shopping.shopping_mall_backend.global.enums.Role;

@Entity
@NoArgsConstructor // 기본 생성자를 생성
@AllArgsConstructor // 모든 필드를 매개변수로 받는 생성자를 생성
@ToString
@Getter
@Setter
public class Member extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false, length = 20)
    private String username;

    @Column(unique = true, nullable = false, length = 20)
    private String nickname;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String address;
    private String addressDetail;
    private String addressMore;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING) // Enum 값을 문자열로 저장
    private Role role;

    private Boolean overAge;
    private Boolean termsOfService;
    private Boolean privacyPolicy;
    private Boolean marketingConsent;
    private Boolean notifications;

    @PrePersist
    public void prePersistUserType() {
        if (role == null) {
            role = Role.CUSTOMER;
        }
    }
}
