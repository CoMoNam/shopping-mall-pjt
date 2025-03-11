package side.shopping.shopping_mall_backend.global.web.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import side.shopping.shopping_mall_backend.global.domain.auth.JwtRequestInfo;
import side.shopping.shopping_mall_backend.global.service.auth.AuthService;
import side.shopping.shopping_mall_backend.global.enums.EndPoint;

@RestController
@RequestMapping(value = EndPoint.AUTH_CONTROLLER)
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping(value = "/get_token_info", consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> getTokenInfo(@RequestBody JwtRequestInfo jwtRequestInfo) {
        if (jwtRequestInfo.getToken() == null || !authService.validateToken(jwtRequestInfo.getToken())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(authService.getToken(jwtRequestInfo.getToken()));
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
