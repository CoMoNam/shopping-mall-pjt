package side.shopping.shopping_mall_backend.src.application.dto.member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import side.shopping.shopping_mall_backend.global.enums.Role;
import side.shopping.shopping_mall_backend.src.domain.member.Member;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomUserInfoDto {

    private Long id;
    private String email;
    private String nickname;
    private String password;
    private Role role;
    private boolean isLoggedIn;

    public CustomUserInfoDto(Member member) {
        this.id = member.getId();
        this.email = member.getEmail();
        this.nickname = member.getUsername();
        this.role = member.getRole();
    }
}