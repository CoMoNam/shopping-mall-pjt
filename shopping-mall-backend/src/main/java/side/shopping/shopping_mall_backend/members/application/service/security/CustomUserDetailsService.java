package side.shopping.shopping_mall_backend.members.application.service.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import side.shopping.shopping_mall_backend.global.enums.logs.Comments;
import side.shopping.shopping_mall_backend.global.service.CustomUserDetails;
import side.shopping.shopping_mall_backend.members.application.dto.member.CustomUserInfoDto;
import side.shopping.shopping_mall_backend.members.domain.member.Member;
import side.shopping.shopping_mall_backend.members.infrastructure.persistence.member.MemberRepository;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        // DB에서 사용자 정보 조회 (예제에서는 ID를 기반으로 조회)
        Member member = memberRepository.findById(Long.parseLong(userId))
                .orElseThrow(() -> new UsernameNotFoundException(Comments.USER_NOT_FOUND.getDescriptionEn()));

        // CustomUserDetails 객체 반환
        return new CustomUserDetails(new CustomUserInfoDto(member));
    }
}