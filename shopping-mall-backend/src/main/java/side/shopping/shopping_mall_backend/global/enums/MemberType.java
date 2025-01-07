package side.shopping.shopping_mall_backend.global.enums;

import lombok.Getter;

@Getter
public enum MemberType {
    STORE_OWNER("Store Owner"),  // 가게 점주
    REGULAR_USER("Regular User"); // 일반 사용자

    private final String description;

    MemberType(String description) {
        this.description = description;
    }
}
