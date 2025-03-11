package side.shopping.shopping_mall_backend.global.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Comments {
    // 공통
    TRANSACTION_SUCCESS("TRANSACTION_SUCCESS", "성공적으로 처리 되었습니다.", "transaction is successfully completed"),

    // 권한
    UNAUTHORIZED("UNAUTHORIZED", "권한이 없음", "No Authorities"),
    IS_AUTHENTICATED("IS_AUTHENTICATED", "권한이 있음", "isAuthenticated"),

    // 회원
    EMAIL_IS_DUPLICATED("EMAIL_IS_DUPLICATED", "이메일이 이미 존재합니다.", "already exists"),
    NICKNAME_IS_DUPLICATED("NICKNAME_IS_DUPLICATED", "닉네임이 이미 존재합니다.", "already exists"),
    NO_MEMBER_EXIST("NO_MEMBER_EXIST", "존재하지 않는 회원 입니다.", "this is not exist"),
    NOT_MATCHED_PASSWORD("NOT_MATCHED_PASSWORD", "비밀번호가 일치하지 않습니다.", "password is not matched"),
    NOT_FOUND("NOT_FOUND", "찾을 수 없습니다.", "cannot found"),

    // Spring Security
    CUSTOM_USER_INFO_NO_EXIST("CUSTOM_USER_INFO_NO_EXIST", "CustomUserInfo 가 null 입니다", "CustomUserInfoDto cannot be null"),
    KEY_IS_NOT_SET("KEY_IS_NOT_SET", "key 가 set 되어있지 않습니다", "Signing key is not set");

    private final String key;
    private final String descriptionKo;
    private final String descriptionEn;
}