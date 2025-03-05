package side.shopping.shopping_mall_backend.customer.application.dto.member;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class JoinRequestDto {
    @NotEmpty(message = "email MUST NOT EMPTY")
    @Size(min = 3, max = 255, message = "EMAIL MUST BE 3 - 255 LENGTH")
    @Email(message = "THIS IS NOT EMAIL")
    private String email;

    @NotEmpty(message = "username MUST NOT EMPTY")
    @Size(min = 1, max = 20, message = "USERNAME MUST BE 1 - 20 LENGTH")
    private String username;

    @NotEmpty(message = "nickname MUST NOT EMPTY")
    @Size(min = 1, max = 20, message = "NICKNAME MUST BE 1 - 20 LENGTH")
    private String nickname;

    @NotEmpty(message = "password MUST NOT EMPTY")
    @Size(min = 8, max = 12, message = "PASSWORD MUST BE 8 - 12 LENGTH")
    private String password;

    @NotEmpty(message = "address MUST NOT EMPTY")
    @Size(min = 1, max = 255, message = "ADDRESS MUST BE 1 - 255 LENGTH")
    private String address;

    private String addressDetail;

    private String addressMore;

    private boolean overAge;
    private boolean termsOfService;
    private boolean privacyPolicy;
    private boolean marketingConsent;
    private boolean notifications;

    public JoinRequestDto(String email, String username, String nickname, String password, String address, String addressDetail, String addressMore) {
        this.email = email;
        this.username = username;
        this.nickname = nickname;
        this.password = password;
        this.address = address;
        this.addressDetail = addressDetail;
        this.addressMore = addressMore;
    }
}
