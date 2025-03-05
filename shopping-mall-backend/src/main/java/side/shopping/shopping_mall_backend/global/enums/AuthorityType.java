package side.shopping.shopping_mall_backend.global.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum AuthorityType {
    MEMBER_ROLE("MEMBER_ROLE", "회원 role");

    private final String key;
    private final String value;
}
