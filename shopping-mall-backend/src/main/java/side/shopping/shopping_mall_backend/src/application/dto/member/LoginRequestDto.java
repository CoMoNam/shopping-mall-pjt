package side.shopping.shopping_mall_backend.src.application.dto.member;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequestDto {

    @NotNull(message = "* 이메일 입력이 필요합니다 *")
    private String email;

    @NotNull(message = "* 비밀번호 입력이 필요합니다 *")
    private String password;
}