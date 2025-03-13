package side.shopping.shopping_mall_backend.src.application.service.member;

import org.springframework.http.ResponseEntity;
import side.shopping.shopping_mall_backend.src.application.dto.member.JoinRequestDto;
import side.shopping.shopping_mall_backend.src.application.dto.member.LoginRequestDto;

/*
    회원 인터페이스
 */
public interface MemberService {
    void join(JoinRequestDto joinRequestDto);
    ResponseEntity<Void> login(LoginRequestDto loginRequestDto);
}