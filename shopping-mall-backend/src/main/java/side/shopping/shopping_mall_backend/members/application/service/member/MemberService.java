package side.shopping.shopping_mall_backend.members.application.service.member;

import side.shopping.shopping_mall_backend.members.application.dto.member.JoinRequestDto;
import side.shopping.shopping_mall_backend.members.application.dto.member.LoginRequestDto;

/*
    회원 인터페이스
 */
public interface MemberService {
    void join(JoinRequestDto joinRequestDto);
    String login(LoginRequestDto loginRequestDto);
}