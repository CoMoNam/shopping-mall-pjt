package side.shopping.shopping_mall_backend.customer.application.service.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import side.shopping.shopping_mall_backend.global.enums.Comments;
import side.shopping.shopping_mall_backend.global.service.CustomUserDetails;
import side.shopping.shopping_mall_backend.customer.application.dto.member.CustomUserInfoDto;
import side.shopping.shopping_mall_backend.customer.domain.member.Member;
import side.shopping.shopping_mall_backend.customer.infrastructure.persistence.member.MemberRepository;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        // DB에서 사용자 정보 조회 (예제에서는 ID를 기반으로 조회)
        Member member = memberRepository.findById(Long.parseLong(userId))
                .orElseThrow(() -> new UsernameNotFoundException(Comments.NOT_FOUND.getDescriptionEn()));

        // CustomUserDetails 객체 반환
        return new CustomUserDetails(new CustomUserInfoDto(member));
    }
}