package side.shopping.shopping_mall_backend.members.application.service.member;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import side.shopping.shopping_mall_backend.global.enums.logs.Comments;
import side.shopping.shopping_mall_backend.global.util.security.JwtUtil;
import side.shopping.shopping_mall_backend.members.application.dto.member.CustomUserInfoDto;
import side.shopping.shopping_mall_backend.members.application.dto.member.LoginRequestDto;
import side.shopping.shopping_mall_backend.members.application.dto.member.MemberDto;
import side.shopping.shopping_mall_backend.members.application.mapper.member.MemberMapper;
import side.shopping.shopping_mall_backend.members.domain.member.Member;
import side.shopping.shopping_mall_backend.members.infrastructure.persistence.member.MemberRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService{
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final ModelMapper modelMapper;

    @Override
    public void join(MemberDto memberDto) {
        Member member = MemberMapper.INSTANCE.toMember(memberDto);

        // email 중복 확인
        if (isEmailDuplicate(member.getEmail())) {
            throw new IllegalArgumentException(Comments.EMAIL_DUPLICATED.getDescriptionEn());
        }

        // nickname 중복 확인
        if (isNicknameDuplicate(member.getEmail())) {
            throw new IllegalArgumentException(Comments.NICKNAME_DUPLICATED.getDescriptionEn());
        }

        member.setPassword(passwordEncoder.encode(memberDto.getPassword()));

        memberRepository.save(member);
    }

    @Override
    public String login(LoginRequestDto loginRequestDto) {
        Optional<Member> optionalMember = memberRepository.findByEmail(loginRequestDto.getEmail());

        if (optionalMember.isEmpty()) {
            throw new UsernameNotFoundException(Comments.NOT_EXIST_EMAIL.getDescriptionEn());
        }

        if (!passwordEncoder.matches(loginRequestDto.getPassword(), optionalMember.get().getPassword())) {
            throw new BadCredentialsException(Comments.NOT_MATCHED_PASSWORD.getDescriptionEn());
        }

        CustomUserInfoDto customUserInfoDto = modelMapper.map(optionalMember.get(), CustomUserInfoDto.class);

        return jwtUtil.createAccessToken(customUserInfoDto);
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