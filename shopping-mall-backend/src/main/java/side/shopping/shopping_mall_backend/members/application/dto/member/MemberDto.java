package side.shopping.shopping_mall_backend.members.application.dto.member;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import side.shopping.shopping_mall_backend.global.enums.MemberType;

@ToString
@Getter
@Setter
public class MemberDto {
    private Long id;

    @NotEmpty(message = "EMAIL MUST NOT EMPTY")
    @Size(min = 3, max = 255, message = "EMAIL MUST BE 3 - 255 LENGTH")
    @Email(message = "THIS IS NOT EMAIL")
    private String email;

    @NotEmpty(message = "USERNAME MUST NOT EMPTY")
    @Size(min = 1, max = 20, message = "USERNAME MUST BE 1 - 20 LENGTH")
    private String username;

    @NotEmpty(message = "NICKNAME MUST NOT EMPTY")
    @Size(min = 1, max = 20, message = "NICKNAME MUST BE 1 - 20 LENGTH")
    private String nickname;

    @NotEmpty(message = "PASSWORD MUST NOT EMPTY")
    @Size(min = 8, max = 12, message = "PASSWORD MUST BE 8 - 12 LENGTH")
    private String password;

    @NotEmpty(message = "ADDRESS MUST NOT EMPTY")
    @Size(min = 1, max = 255, message = "ADDRESS MUST BE 1 - 255 LENGTH")
    private String address;

    private String addressDetail;

    private String addressMore;

    @Enumerated(EnumType.STRING)
    private MemberType memberType;
}