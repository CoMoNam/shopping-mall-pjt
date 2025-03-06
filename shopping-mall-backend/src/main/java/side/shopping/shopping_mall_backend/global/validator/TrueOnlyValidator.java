package side.shopping.shopping_mall_backend.global.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class TrueOnlyValidator implements ConstraintValidator<TrueOnly, Boolean> {

    @Override
    public boolean isValid(Boolean value, ConstraintValidatorContext context) {
        // null 값은 별도로 처리하지 않으면 유효하다고 판단됨
        return value != null && value; // 값이 null이 아니고 true여야만 유효
    }
}