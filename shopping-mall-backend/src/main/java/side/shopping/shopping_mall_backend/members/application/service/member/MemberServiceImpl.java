package side.shopping.shopping_mall_backend.members.application.service.member;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import side.shopping.shopping_mall_backend.members.application.dto.member.MemberDto;
import side.shopping.shopping_mall_backend.members.application.mapper.member.MemberMapper;
import side.shopping.shopping_mall_backend.members.domain.member.Member;
import side.shopping.shopping_mall_backend.members.infrastructure.persistence.member.MemberRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService{
    private final MemberRepository memberRepository;

    @Override
    public void join(MemberDto memberDto) {
        Member member = MemberMapper.INSTANCE.toMember(memberDto);

        // email 중복 확인
        if (isEmailDuplicate(member.getEmail())) {
            throw new IllegalArgumentException("email already exists");
        }

        // nickname 중복 확인
        if (isNicknameDuplicate(member.getEmail())) {
            throw new IllegalArgumentException("nickname already exists");
        }

        memberRepository.save(member);
    }

    // email 검증
    public boolean isEmailDuplicate(String email) {
        return memberRepository.findByEmail(email).isPresent();
    }

    // nickname 검증
    public boolean isNicknameDuplicate(String nickname) {
        return memberRepository.findByNickname(nickname).isPresent();
    }
}
