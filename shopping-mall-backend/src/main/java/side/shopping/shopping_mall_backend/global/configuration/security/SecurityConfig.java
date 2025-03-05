package side.shopping.shopping_mall_backend.global.configuration.security;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import side.shopping.shopping_mall_backend.global.entrypoint.security.CustomAuthenticationEntryPoint;
import side.shopping.shopping_mall_backend.global.enums.EndPoint;
import side.shopping.shopping_mall_backend.global.filter.security.JwtAuthFilter;
import side.shopping.shopping_mall_backend.global.handler.security.CustomAccessDeniedHandler;
import side.shopping.shopping_mall_backend.global.util.security.JwtUtil;
import side.shopping.shopping_mall_backend.customer.application.service.security.CustomUserDetailsService;

import java.util.List;

@Configuration
@EnableWebSecurity
//메서드 수준에서의 보안 처리 활성화
//@Secure, @PreAuthorize 어노테이션 사용 가능
@EnableMethodSecurity(securedEnabled = true, prePostEnabled = true)
@AllArgsConstructor
public class SecurityConfig {

    private final CustomUserDetailsService customUserDetailsService;
    private final JwtUtil jwtUtil;
    private final CustomAccessDeniedHandler accessDeniedHandler;
    private final CustomAuthenticationEntryPoint authenticationEntryPoint;

    private static final String[] AUTH_WHITELIST = {EndPoint.MEMBER_CONTROLLER + "/join", EndPoint.MEMBER_CONTROLLER + "/login"};

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        //CSRF, CORS
        http.csrf(AbstractHttpConfigurer::disable)
//        http.cors((Customizer.withDefaults()));
            .cors(cors -> cors.configurationSource(request -> {
                var corsConfiguration = new org.springframework.web.cors.CorsConfiguration();
                corsConfiguration.setAllowedOrigins(List.of("http://localhost:3000"));
                corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
                corsConfiguration.setAllowedHeaders(List.of("*"));
                corsConfiguration.setAllowCredentials(true);
                return corsConfiguration;
            }));

        //세션 관리 상태 없음으로 구성, Spring Security가 세션 생성 or 사용 x
        http.sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(
                SessionCreationPolicy.STATELESS));

        //FormLogin, BasicHttp 비활성화
        http.formLogin(AbstractHttpConfigurer::disable);
        http.httpBasic(AbstractHttpConfigurer::disable);

        //JwtAuthFilter를 UsernamePasswordAuthenticationFilter 앞에 추가
        http.addFilterBefore(new JwtAuthFilter(customUserDetailsService, jwtUtil),
                UsernamePasswordAuthenticationFilter.class);

        http.exceptionHandling((exceptionHandling) -> exceptionHandling.authenticationEntryPoint(
                authenticationEntryPoint).accessDeniedHandler(accessDeniedHandler));

        //권한 규칙 작성
        http.authorizeHttpRequests(authorize -> authorize
                .requestMatchers(AUTH_WHITELIST).permitAll()
                //@PreAuthorization 사용 -> 모든 경로에 대한 인증처리는 Pass
                .anyRequest().permitAll()
        );

        return http.build();
    }
}