package side.shopping.shopping_mall_backend.global.service.auth;

import side.shopping.shopping_mall_backend.customer.application.dto.member.LoggedInMemberDto;

public interface AuthService {
    LoggedInMemberDto getToken(String token);
    boolean validateToken(String token);
}