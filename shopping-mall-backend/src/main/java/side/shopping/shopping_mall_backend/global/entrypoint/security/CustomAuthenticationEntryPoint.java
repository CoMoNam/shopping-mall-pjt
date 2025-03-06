package side.shopping.shopping_mall_backend.global.entrypoint.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import side.shopping.shopping_mall_backend.global.exception.ErrorResponseDto;

import java.io.IOException;
import java.time.LocalDateTime;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper;
    private static final String contentType = "application/json";
    private static final String characterEncoding = "UTF-8";

    public CustomAuthenticationEntryPoint(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        // 인증되지 않은 요청에 대해 401 Unauthorized 상태 코드 반환
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType(contentType);
        response.setCharacterEncoding(characterEncoding);

        // 에러 응답 작성
        ErrorResponseDto errorResponseDto = new ErrorResponseDto(
                HttpServletResponse.SC_UNAUTHORIZED,
                authException.getMessage(),
                LocalDateTime.now()
        );

        // JSON 응답으로 에러 메시지 전송
        response.getWriter().write(objectMapper.writeValueAsString(errorResponseDto));
    }
}