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

    // 회원
    IS_DUPLICATED("IS_DUPLICATED", "이미 존재합니다.", "already exists"),
    NOT_EXIST("NOT_EXIST", "존재 하지 않습니다.", "this is not exist"),
    NOT_MATCHED_PASSWORD("NOT_MATCHED_PASSWORD", "비밀번호가 일치하지 않습니다.", "password is not matched"),
    NOT_FOUND("NOT_FOUND", "찾을 수 없습니다.", "cannot found");


    private final String key;
    private final String descriptionKo;
    private final String descriptionEn;
}