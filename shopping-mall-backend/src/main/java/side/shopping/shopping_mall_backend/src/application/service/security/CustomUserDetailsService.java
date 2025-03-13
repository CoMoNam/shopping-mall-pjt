package side.shopping.shopping_mall_backend.src.application.service.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import side.shopping.shopping_mall_backend.global.enums.Comments;
import side.shopping.shopping_mall_backend.global.mvc.service.security.CustomUserDetails;
import side.shopping.shopping_mall_backend.src.application.dto.member.CustomUserInfoDto;
import side.shopping.shopping_mall_backend.src.domain.member.Member;
import side.shopping.shopping_mall_backend.src.infrastructure.persistence.member.MemberRepository;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        // DB에서 사용자 정보 조회
        Member member = memberRepository.findById(Long.parseLong(userId))
                .orElseThrow(() -> new UsernameNotFoundException(Comments.NOT_FOUND.getDescriptionEn()));
        // CustomUserDetails 객체 반환
        return new CustomUserDetails(new CustomUserInfoDto(member));
    }
}