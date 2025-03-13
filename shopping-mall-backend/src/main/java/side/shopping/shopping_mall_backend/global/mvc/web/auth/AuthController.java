package side.shopping.shopping_mall_backend.global.mvc.web.auth;

import jakarta.servlet.http.Cookie;
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

//    @GetMapping(value = "/get_token")
//    public ResponseEntity<?> getToken(@CookieValue(name = "jwt", required = false) String token) {
//        System.out.println("=====>> 진입::1");
//        System.out.println(token);
//        System.out.println("=====>> 진입::2");
//        if (token == null || !authService.validateToken(token)) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
//        return ResponseEntity.ok(authService.getToken(token));
//    }

//    @GetMapping("/get_token")
//    public ResponseEntity<?> getToken(@RequestHeader("Cookie") String cookieHeader) {
//        System.out.println("=====>> Request Header - Cookie: " + cookieHeader);
//
//        // 쿠키에서 jwt를 추출
//        String jwt = Arrays.stream(cookieHeader.split(";"))
//                .map(String::trim)
//                .filter(cookie -> cookie.startsWith("jwt="))
//                .map(cookie -> cookie.substring("jwt=".length()))
//                .findFirst()
//                .orElse(null);
//
//        System.out.println("JWT from Cookie: " + jwt);
//
//        if (jwt == null || !authService.validateToken(jwt)) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
//        return ResponseEntity.ok(authService.getToken(jwt));
//    }
}
