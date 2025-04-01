package side.shopping.shopping_mall_backend.global.util.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import side.shopping.shopping_mall_backend.global.enums.Comments;
import side.shopping.shopping_mall_backend.global.enums.Role;
import side.shopping.shopping_mall_backend.global.enums.security.TokenStatus;
import side.shopping.shopping_mall_backend.src.application.dto.member.CustomUserInfoDto;

import java.security.Key;
import java.time.ZonedDateTime;
import java.util.Date;

@Slf4j
@Component
public class JwtUtil {

    private final Key key;
    private final long accessTokenExpTime;
    private final boolean secure;
    private final String sameSite;

    public JwtUtil(
            @Value("${jwt.secret-key}") final String secretKey,
            @Value("${jwt.expiration-time}") final long accessTokenExpTime,
            @Value("${cookie.secure}") final boolean secure,
            @Value("${cookie.sameSite}") final String sameSite)
    {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
        this.accessTokenExpTime = accessTokenExpTime;
        this.secure = secure;
        this.sameSite = sameSite;
    }

    /**
     * Access Token 생성
     *
     * @return Access Token String
     */
    public ResponseEntity<Void> createAccessToken(CustomUserInfoDto customUserInfoDto) {
        // 현재 요청-응답 객체 가져오기
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attributes == null) {
            throw new IllegalStateException("현재 요청 컨텍스트를 가져올 수 없습니다.");
        }

        HttpServletResponse response = attributes.getResponse();
        if (response == null) {
            throw new IllegalStateException("현재 응답 객체를 가져올 수 없습니다.");
        }

        String jwtToken = createToken(customUserInfoDto, accessTokenExpTime);

        ResponseCookie cookie = ResponseCookie.from("jwt", jwtToken)
                .httpOnly(true) // (JS 접근 방지)
                .secure(secure) // HTTPS 에서만 전송 X -> local 개발환경
                .sameSite(sameSite) // Cross-Origin 요청에서도 항상 쿠키가 전송되도록 허용. HTTPS 환경에서만 사용할 것을 권장하지만, HTTP 환경에서도 명시적으로 설정할 수 있음.
                .path("/") // 쿠키가 유효한 경로 설정
                .maxAge(accessTokenExpTime) // 만료시간
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok().build();
    }

    /**
     *
     * metamask jwt create
     */

    public ResponseEntity<Void> createMetamaskToken(String address) {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attributes == null) {
            throw new IllegalStateException("현재 요청 컨텍스트를 가져올 수 없습니다.");
        }

        HttpServletResponse response = attributes.getResponse();
        if (response == null) {
            throw new IllegalStateException("현재 응답 객체를 가져올 수 없습니다.");
        }

        CustomUserInfoDto customUserInfoDto = new CustomUserInfoDto();
        customUserInfoDto.setId(0L);
        customUserInfoDto.setEmail(address);
        customUserInfoDto.setNickname(address);
        customUserInfoDto.setRole(Role.CUSTOMER);

        String jwtToken = createToken(customUserInfoDto, accessTokenExpTime);

        ResponseCookie cookie = ResponseCookie.from("jwt", jwtToken)
                .httpOnly(true)
                .secure(secure)
                .sameSite(sameSite)
                .path("/")
                .maxAge(accessTokenExpTime)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok().build();
    }

    /**
     * JWT 생성
     *
     * @return JWT String
     */
    private String createToken(CustomUserInfoDto customUserInfoDto, long expireTime) {
        // Validate
        if (customUserInfoDto == null) {
            throw new IllegalArgumentException(Comments.CUSTOM_USER_INFO_NO_EXIST.getDescriptionEn());
        }

        if (key == null) {
            throw new IllegalStateException(Comments.KEY_IS_NOT_SET.getDescriptionEn());
        }

        Claims claims = Jwts.claims();
        claims.put("id", customUserInfoDto.getId());
        claims.put("email", customUserInfoDto.getEmail());
        claims.put("nickname", customUserInfoDto.getNickname());
        claims.put("role", customUserInfoDto.getRole());

        ZonedDateTime currentTime = ZonedDateTime.now();
        ZonedDateTime expirationTime = currentTime.plusSeconds(expireTime);

        return Jwts.builder()
                .setClaims(claims)
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setIssuedAt(Date.from(currentTime.toInstant()))
                .setExpiration(Date.from(expirationTime.toInstant()))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Token 에서 User 정보 추출
     *
     * @return User 정보
     */
    public Long getUserId(String token) {
        return parseClaims(token).get("id", Long.class);
    }
    public String getEmail(String token) {
        return parseClaims(token).get("email", String.class);
    }
    public String getNickname(String token) {
        return parseClaims(token).get("nickname", String.class);
    }
    public Role getRole(String token) {
        String roleString = parseClaims(token).get("role", String.class); // String으로 클레임 추출
        if (roleString == null) {
            throw new IllegalArgumentException("Role claim is missing from the token");
        }
        return Role.valueOf(roleString); // String을 Role enum으로 변환
    }

    /**
     * JWT 검증
     *
     * @return IsValidate
     */
    public boolean isValidToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            log.info(TokenStatus.INVALID.getDescriptionEn(), e);
        } catch (ExpiredJwtException e) {
            log.info(TokenStatus.EXPIRED.getDescriptionEn(), e);
        } catch (UnsupportedJwtException e) {
            log.info(TokenStatus.UNSUPPORTED.getDescriptionEn(), e);
        } catch (IllegalArgumentException e) {
            log.info(TokenStatus.EMPTY.getDescriptionEn(), e);
        }
        return false;
    }

    /**
     * JWT Claims 추출
     *
     * @return JWT Claims
     */
    public Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(accessToken)
                    .getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}