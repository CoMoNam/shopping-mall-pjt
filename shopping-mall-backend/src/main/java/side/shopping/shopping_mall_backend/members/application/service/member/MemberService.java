package side.shopping.shopping_mall_backend.members.application.service.member;

import side.shopping.shopping_mall_backend.members.application.dto.member.MemberDto;

/*
    회원가입 인터페이스
 */
public interface MemberService {
    void join(MemberDto memberDto);
}