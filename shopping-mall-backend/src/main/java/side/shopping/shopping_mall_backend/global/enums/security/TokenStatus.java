package side.shopping.shopping_mall_backend.global.enums.security;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum TokenStatus {
    AUTHENTICATED("AUTHENTICATED", "인증된 JWT 토큰", "Authenticated JWT token"),
    EXPIRED("EXPIRED", "만료된 JWT 토큰", "Expired JWT token"),
    INVALID("INVALID", "유효하지 않은 JWT 토큰", "Invalid JWT token"),
    UNSUPPORTED("UNSUPPORTED", "지원되지 않는 방식", "Method not supported"),
    EMPTY("EMPTY", "JWT claims 문자열이 비어있음", "JWT claims is empty");

    private final String key;
    private final String descriptionKo;
    private final String descriptionEn;
}