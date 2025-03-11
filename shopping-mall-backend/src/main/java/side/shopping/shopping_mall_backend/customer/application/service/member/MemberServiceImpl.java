package side.shopping.shopping_mall_backend.customer.application.service.member;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import side.shopping.shopping_mall_backend.global.enums.Comments;
import side.shopping.shopping_mall_backend.global.util.security.JwtUtil;
import side.shopping.shopping_mall_backend.customer.application.dto.member.CustomUserInfoDto;
import side.shopping.shopping_mall_backend.customer.application.dto.member.JoinRequestDto;
import side.shopping.shopping_mall_backend.customer.application.dto.member.LoginRequestDto;
import side.shopping.shopping_mall_backend.customer.application.mapper.member.MemberMapper;
import side.shopping.shopping_mall_backend.customer.domain.member.Member;
import side.shopping.shopping_mall_backend.customer.infrastructure.persistence.member.MemberRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService{
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Override
    public void join(JoinRequestDto joinRequestDto) {
        Member member = MemberMapper.INSTANCE.toMember(joinRequestDto);

        // email 중복 확인
        if (isEmailDuplicate(member.getEmail())) {
            throw new IllegalArgumentException(Comments.EMAIL_IS_DUPLICATED.getDescriptionKo());
        }

        // nickname 중복 확인
        if (isNicknameDuplicate(member.getNickname())) {
            throw new IllegalArgumentException(Comments.NICKNAME_IS_DUPLICATED.getDescriptionKo());
        }

        member.setPassword(passwordEncoder.encode(joinRequestDto.getPassword()));

        memberRepository.save(member);
    }

    @Override
    public ResponseEntity<Void> login(LoginRequestDto loginRequestDto) {
        Optional<Member> optionalMember = memberRepository.findByEmail(loginRequestDto.getEmail());

        if (optionalMember.isEmpty()) {
            throw new UsernameNotFoundException(Comments.NO_MEMBER_EXIST.getDescriptionKo());
        }

        if (!passwordEncoder.matches(loginRequestDto.getPassword(), optionalMember.get().getPassword())) {
            throw new BadCredentialsException(Comments.NOT_MATCHED_PASSWORD.getDescriptionKo());
        }

        CustomUserInfoDto customUserInfoDto = MemberMapper.INSTANCE.toCustomUserInfoDto(optionalMember.get());

        return jwtUtil.createAccessToken(customUserInfoDto);
    }

    // email 중복 검증
    public boolean isEmailDuplicate(String email) {
        return memberRepository.findByEmail(email).isPresent();
    }

    // nickname 중복 검증
    public boolean isNicknameDuplicate(String nickname) {
        return memberRepository.findByNickname(nickname).isPresent();
    }
}