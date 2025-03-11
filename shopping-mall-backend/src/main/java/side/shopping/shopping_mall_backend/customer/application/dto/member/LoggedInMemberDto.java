package side.shopping.shopping_mall_backend.customer.application.dto.member;

import lombok.*;
import side.shopping.shopping_mall_backend.global.enums.Role;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LoggedInMemberDto {
    private Long id;
    private String email;
    private String nickname;
    private Role role;
    private Boolean isLoggedIn;
}
