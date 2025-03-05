package side.shopping.shopping_mall_backend.customer.infrastructure.persistence.authority;

import org.springframework.data.jpa.repository.JpaRepository;
import side.shopping.shopping_mall_backend.customer.domain.authority.AuthorityRequest;

public interface AuthorityRequestRepository extends JpaRepository<AuthorityRequest, Long> {
}
