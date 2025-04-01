package side.shopping.shopping_mall_backend.global.mvc.web.auth;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import side.shopping.shopping_mall_backend.global.mvc.domain.auth.JwtRequestInfo;
import side.shopping.shopping_mall_backend.global.enums.Comments;
import side.shopping.shopping_mall_backend.global.mvc.service.auth.AuthService;
import side.shopping.shopping_mall_backend.global.enums.EndPoint;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping(value = EndPoint.AUTH_CONTROLLER)
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    //jwt token 으로 유저정보 및 로그인상태 관리
    @PostMapping(value = "/get_token_info", consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> getTokenInfo(@RequestBody JwtRequestInfo jwtRequestInfo) {
        if (jwtRequestInfo.getToken() == null || !authService.validateToken(jwtRequestInfo.getToken())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(authService.getToken(jwtRequestInfo.getToken()));
    }

    // 로그 아웃
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {
        // 쿠키 무효화 - 삭제
        Cookie cookie = new Cookie("jwt", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(0); // 쿠키 즉시 만료
        response.addCookie(cookie);

        return ResponseEntity.ok(Comments.TRANSACTION_SUCCESS.getDescriptionEn());
    }
}
