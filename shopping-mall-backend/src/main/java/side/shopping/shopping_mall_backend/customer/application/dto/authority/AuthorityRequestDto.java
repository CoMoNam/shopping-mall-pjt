package side.shopping.shopping_mall_backend.customer.application.dto.authority;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import side.shopping.shopping_mall_backend.global.enums.AuthorityType;

@ToString
@Getter
@Setter
public class AuthorityRequestDto {
    @NotEmpty(message = "authorityType MUST NOT EMPTY")
    private AuthorityType authorityType;

    @NotEmpty(message = "memberId MUST NOT EMPTY")
    private Long memberId;

    @NotEmpty(message = "value MUST NOT EMPTY")
    private String value;
}
