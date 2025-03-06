package side.shopping.shopping_mall_backend.global.handler.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;
import side.shopping.shopping_mall_backend.global.enums.Comments;
import side.shopping.shopping_mall_backend.global.exception.ErrorResponseDto;

import java.io.IOException;
import java.time.LocalDateTime;

@Slf4j(topic = "FORBIDDEN_EXCEPTION_HANDLER")
@AllArgsConstructor
@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    private final ObjectMapper objectMapper;
    private static final String characterEncoding = "UTF-8";

    @Override
    public void handle(final HttpServletRequest request, final HttpServletResponse response,
                       final AccessDeniedException accessDeniedException) throws IOException, ServletException {
        log.error(Comments.UNAUTHORIZED.getDescriptionEn(), accessDeniedException);

        ErrorResponseDto errorResponseDto = new ErrorResponseDto(HttpStatus.FORBIDDEN.value(),
                accessDeniedException.getMessage(),
                LocalDateTime.now());

        String responseBody = objectMapper.writeValueAsString(errorResponseDto);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setCharacterEncoding(characterEncoding);
        response.getWriter().write(responseBody);
    }
}