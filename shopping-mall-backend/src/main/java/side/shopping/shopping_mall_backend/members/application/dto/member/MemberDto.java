package side.shopping.shopping_mall_backend.members.application.dto.member;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import side.shopping.shopping_mall_backend.global.enums.member.Role;

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