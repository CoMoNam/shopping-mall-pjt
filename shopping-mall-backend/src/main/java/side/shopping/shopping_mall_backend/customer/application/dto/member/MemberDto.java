package side.shopping.shopping_mall_backend.customer.application.dto.member;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import side.shopping.shopping_mall_backend.global.enums.Role;

@ToString
@Getter
@Setter
public class MemberDto {
    private Long id;
    private String email;
    private String username;
    private String nickname;
    private String password;
    private String address;
    private String addressDetail;
    private String addressMore;
    @Enumerated(EnumType.STRING)
    private Role role;
}