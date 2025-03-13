package side.shopping.shopping_mall_backend.global.mvc.service.auth;

import side.shopping.shopping_mall_backend.src.application.dto.member.LoggedInMemberDto;

public interface AuthService {
    LoggedInMemberDto getToken(String token);
    boolean validateToken(String token);
}