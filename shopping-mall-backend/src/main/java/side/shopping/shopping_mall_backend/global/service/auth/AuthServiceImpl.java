package side.shopping.shopping_mall_backend.global.service.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import side.shopping.shopping_mall_backend.customer.application.dto.member.LoggedInMemberDto;
import side.shopping.shopping_mall_backend.global.enums.Role;
import side.shopping.shopping_mall_backend.global.util.security.JwtUtil;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService{
    private final JwtUtil jwtUtil;

    @Override
    public boolean validateToken(String token) {
        return jwtUtil.isValidToken(token);
    }


    @Override
    public LoggedInMemberDto getToken(String token) {
        if (token == null || token.isEmpty()) {
            return null;
        }
        Long id = jwtUtil.getUserId(token);
        String email = jwtUtil.getEmail(token);
        String nickname = jwtUtil.getNickname(token);
        Role role = jwtUtil.getRole(token);
        boolean isLoggedIn = this.validateToken(token);

        return new LoggedInMemberDto(id, email, nickname, role, isLoggedIn);
    }
}
