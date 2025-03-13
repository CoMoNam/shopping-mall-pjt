package side.shopping.shopping_mall_backend.src.infrastructure.persistence.member;

import org.springframework.data.jpa.repository.JpaRepository;
import side.shopping.shopping_mall_backend.src.domain.member.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);
    Optional<Member> findByNickname(String nickname);
}