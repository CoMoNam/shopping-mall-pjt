package side.shopping.shopping_mall_backend.global.util.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import side.shopping.shopping_mall_backend.global.mvc.service.security.CustomUserDetails;

@Component
public class LoginUserUtil {
    public Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails) {
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            return userDetails.getMember().getId();
        }
        return null; // or throw exception
    }
}
