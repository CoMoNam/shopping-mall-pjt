package side.shopping.shopping_mall_backend.global.filter.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;
import side.shopping.shopping_mall_backend.global.util.security.JwtUtil;
import side.shopping.shopping_mall_backend.customer.application.service.security.CustomUserDetailsService;

import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final CustomUserDetailsService customUserDetailsService;
    private final JwtUtil jwtUtil;

    /**
     * JWT 검증 필터 수행
     */
//    @Override
//    protected void doFilterInternal(final HttpServletRequest request,
//                                    final HttpServletResponse response,
//                                    final FilterChain filterChain) throws ServletException, IOException {
//        String authorizationHeader = request.getHeader("Authorization");
//
//        //JWT 헤더가 있을 경우
//        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
//            String token = authorizationHeader.substring(7);
//
//            //JWT 유효성 검증
//            if (jwtUtil.isValidToken(token)) {
//                Long userId = jwtUtil.getUserId(token);
//
//                //유저와 토큰 일치 시 userDetails 생성
//                UserDetails userDetails = customUserDetailsService.loadUserByUsername(
//                        userId.toString());
//                if (userDetails != null) {
//                    //UserDetails, Password, Role -> 접근 권한 인증 Token 생성
//                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
//                            userDetails, null, userDetails.getAuthorities());
//
//                    //현재 Request의 Security Context에 접근 권한 설정
//                    SecurityContextHolder.getContext()
//                            .setAuthentication(usernamePasswordAuthenticationToken);
//                }
//            }
//        }
//
//        filterChain.doFilter(request, response); //다음 필터로 넘김
//    }

    @Override
    protected void doFilterInternal(final HttpServletRequest request,
                                    final HttpServletResponse response,
                                    final FilterChain filterChain) throws ServletException, IOException {
        // 1. 쿠키에서 JWT 꺼내기
        String token = resolveTokenFromCookie(request);

        // 2. 토큰이 존재하고 유효한지 확인
        if (token != null && jwtUtil.isValidToken(token)) {
            Long userId = jwtUtil.getUserId(token);

            // 3. 유저 정보 로드
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(userId.toString());
            if (userDetails != null) {
                // 4. Authentication 생성 및 등록
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
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