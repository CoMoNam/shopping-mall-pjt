package side.shopping.shopping_mall_backend.src.application.dto.member;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import side.shopping.shopping_mall_backend.global.validator.TrueOnly;

@ToString
@Getter
@Setter
public class JoinRequestDto {
    @NotEmpty(message = "* 이메일이 필요합니다 *")
    @Size(min = 3, max = 255, message = "* 이메일 길이를 확인해주세요 *")
    @Email(message = "* 이메일 형식이 아닙니다 *")
    private String email;

    @NotEmpty(message = "* 사용자이름이 필요합니다 *")
    @Size(min = 1, max = 20, message = "* 사용자이름 길이를 확인해주세요 *")
    private String username;

    @NotEmpty(message = "* 활동명이 필요합니다 *")
    @Size(min = 1, max = 6, message = "* 활동명의 길이를 확인해주세요 *")
    private String nickname;

    @NotEmpty(message = "비밀번호가 필요합니다")
    @Size(min = 8, max = 12, message = "* 비밀번호의 길이는 8-12 입니다 *")
    private String password;

    @NotEmpty(message = "* 주소를 확인해주세요 *")
    @Size(min = 1, max = 255, message = "* 주소의 길이를 확인해주세요 *")
    private String address;

    private String addressDetail;

    private String addressMore;

    @TrueOnly(message = "* 만 14세 확인에 동의해야 합니다 *")
    private boolean overAge;
    @TrueOnly(message = "* 이용약관에 동의해야 합니다 *")
    private boolean termsOfService;
    @TrueOnly(message = "* 개인정보수집 및 이용에 동의해야 합니다 *")
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
