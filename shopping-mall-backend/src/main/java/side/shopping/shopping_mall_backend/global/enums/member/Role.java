package side.shopping.shopping_mall_backend.global.enums.member;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    NOT_REGISTERED("ROLE_NOT_REGISTERED", "회원가입 이전 사용자"),
    SELLER("ROLE_SELLER", "판매자"),
    USER("ROLE_USER", "일반 사용자"),
    ADMIN("ROLE_ADMIN", "관리자"), // 관리자
    SUPER_ACCOUNT("ROLE_SUPER_ACCOUNT", "슈퍼 계정"); // 슈퍼계정

    private final String key;
    private final String description;
}
