package side.shopping.shopping_mall_backend.global.enums.logs;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Comments {
    // 권한
    UNAUTHORIZED("UNAUTHORIZED", "권한이 없음", "No Authorities"),

    // 회원
    MEMBER_JOIN_SUCCESS("MEMBER_JOIN_SUCCESS", "회원가입 완료", "member join success"),
    EMAIL_DUPLICATED("EMAIL_DUPLICATED", "이미 존재하는 Email 입니다.", "email already exists"),
    NICKNAME_DUPLICATED("NICKNAME_DUPLICATED", "이미 존재하는 닉네임 입니다.", "nickname already exists"),
    NOT_EXIST_EMAIL("NOT_EXIST_EMAIL", "존재 하지 않는 이메일입니다.", "this email is not exists"),
    NOT_MATCHED_PASSWORD("NOT_MATCHED_PASSWORD", "비밀번호가 일치하지 않습니다.", "password is not matched"),
    USER_NOT_FOUND("USER_NOT_FOUND", "유저를 찾을 수 없습니다.", "user not found");


    private final String key;
    private final String descriptionKo;
    private final String descriptionEn;
}