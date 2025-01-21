package side.shopping.shopping_mall_backend.global.enums;

import lombok.Getter;

@Getter
public enum MemberType {
    STORE_OWNER("STORE OWNER"),  // 가게 점주
    REGULAR_USER("REGULAR USER"); // 일반 사용자

    private final String description;

    MemberType(String description) {
        this.description = description;
    }
}
