package side.shopping.shopping_mall_backend.customer.application.service.authority;

import side.shopping.shopping_mall_backend.customer.application.dto.authority.AuthorityRequestDto;

public interface AuthorityService {
    // 권한 요청
    void requestAuthority(AuthorityRequestDto authorityRequestDto);
}
