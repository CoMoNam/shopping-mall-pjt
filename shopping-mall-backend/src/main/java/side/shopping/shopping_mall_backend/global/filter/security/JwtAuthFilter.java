package side.shopping.shopping_mall_backend.global.filter.security;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;
import side.shopping.shopping_mall_backend.global.configuration.security.SecurityWhiteList;
import side.shopping.shopping_mall_backend.global.enums.Role;
import side.shopping.shopping_mall_backend.global.util.security.JwtUtil;
import side.shopping.shopping_mall_backend.src.application.dto.member.CustomUserInfoDto;
import side.shopping.shopping_mall_backend.src.application.service.security.CustomUserDetailsService;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final CustomUserDetailsService customUserDetailsService;
    private final JwtUtil jwtUtil;

    /**
     * JWT 검증 필터 수행
     */

    @Override
    protected void doFilterInternal(final HttpServletRequest request,
                                    final HttpServletResponse response,
                                    final FilterChain filterChain) throws ServletException, IOException {

        String uri = request.getRequestURI();

        System.out.println("Request URI ====>> " + uri);

        // 화이트리스트 경로일 경우 필터 패스
        for (String white : SecurityWhiteList.AUTH_WHITELIST) {
            if (uri.startsWith(white)) {
                filterChain.doFilter(request, response);
                return;
            }
        }

        // 1. 쿠키에서 JWT 꺼내기
        String token = resolveTokenFromCookie(request);

        // 2. 토큰이 존재하고 유효한지 확인
        if (token != null && jwtUtil.isValidToken(token)) {
            Long userId = jwtUtil.getUserId(token);

            // case. 일반 로그인 유저
            if (userId != 0L) {
                // 3. 유저 정보 로드
                UserDetails userDetails = customUserDetailsService.loadUserByUsername(userId.toString());
                if (userDetails != null) {
                    // 4. Authentication 생성 및 등록
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            } else { // case. 메타마스크 로그인 유저
                String address = jwtUtil.getEmail(token); // 토큰에서 address(이메일)를 꺼내는 메서드
                CustomUserInfoDto metamaskUser = new CustomUserInfoDto();
                metamaskUser.setId(0L);
                metamaskUser.setEmail(address);
//                metamaskUser.setNickname("사용자_" + address.substring(2, 6)); // 예: 사용자_b677
                metamaskUser.setNickname(address);
                metamaskUser.setRole(Role.CUSTOMER);

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(metamaskUser, null,
                                List.of(new SimpleGrantedAuthority(metamaskUser.getRole().name())));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

        }

        // 5. 다음 필터로 넘기기
        filterChain.doFilter(request, response);
    }

    // 쿠키에서 토큰 꺼내는 메서드
    private String resolveTokenFromCookie(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("jwt".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}