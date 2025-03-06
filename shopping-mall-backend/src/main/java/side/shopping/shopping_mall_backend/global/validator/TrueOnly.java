package side.shopping.shopping_mall_backend.global.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = TrueOnlyValidator.class)
@Target({ ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
public @interface TrueOnly {
    String message() default "필수 항목에 동의해야 합니다";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}