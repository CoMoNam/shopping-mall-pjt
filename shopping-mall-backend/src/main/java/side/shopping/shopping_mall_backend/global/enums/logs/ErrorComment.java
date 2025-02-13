package side.shopping.shopping_mall_backend.global.enums.logs;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorComment {
    UNAUTHORIZED("UNAUTHORIZED", "권한이 없음", "No Authorities"),
    USER_NOT_FOUND("USER_NOT_FOUND", "유저를 찾을 수 없습니다.", "User not found");

    private final String key;
    private final String descriptionKo;
    private final String descriptionEn;
}
