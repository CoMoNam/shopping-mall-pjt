package side.shopping.shopping_mall_backend.global.util.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import side.shopping.shopping_mall_backend.global.enums.security.TokenStatus;
import side.shopping.shopping_mall_backend.members.application.dto.member.CustomUserInfoDto;

import java.security.Key;
import java.time.ZonedDateTime;
import java.util.Date;

@Slf4j
@Component
public class JwtUtil {

    private final Key key;
    private final long accessTokenExpTime;

    public JwtUtil(
            @Value("${jwt.secret-key}") final String secretKey,
            @Value("${jwt.expiration-time}") final long accessTokenExpTime)
    {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
        this.accessTokenExpTime = accessTokenExpTime;
    }

    /**
     * Access Token 생성
     *
     * @param customUserInfoDto
     * @return Access Token String
     */
    public String createAccessToken(CustomUserInfoDto customUserInfoDto) {
        return createToken(customUserInfoDto, accessTokenExpTime);
    }

    /**
     * JWT 생성
     * @ param member
     * @param expireTime
     * @return JWT String
     */
    private String createToken(CustomUserInfoDto customUserInfoDto, long expireTime) {
        Claims claims = Jwts.claims();
        claims.put("id", customUserInfoDto.getId());
        claims.put("email", customUserInfoDto.getEmail());
        claims.put("nickname", customUserInfoDto.getNickname());
        claims.put("role", customUserInfoDto.getRole());

        ZonedDateTime now = ZonedDateTime.now();
        ZonedDateTime tokenValidity = now.plusSeconds(expireTime);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(Date.from(now.toInstant()))
                .setExpiration(Date.from(tokenValidity.toInstant()))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Token에서 User ID 추출
     *
     * @param token
     * @return User ID
     */
    public Long getUserId(String token) {
        return parseClaims(token).get("id", Long.class);
    }

    /**
     * JWT 검증
     * @param token
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
     * @param accessToken
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