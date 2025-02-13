package side.shopping.shopping_mall_backend.members.application.dto.member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import side.shopping.shopping_mall_backend.global.enums.member.Role;
import side.shopping.shopping_mall_backend.members.domain.member.Member;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CustomUserInfoDto {

    private Long id;
    private String email;
    private String nickname;
    private String password;
    private Role role;

    public CustomUserInfoDto(Member member) {
        this.id = member.getId();
        this.nickname = member.getUsername();
        this.role = member.getRole();
        this.password = member.getPassword();
    }
}
