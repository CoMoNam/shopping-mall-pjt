package side.shopping.shopping_mall_backend.src.application.service.authority;

import side.shopping.shopping_mall_backend.src.application.dto.authority.AuthorityRequestDto;

public interface AuthorityService {
    // 권한 요청
    void requestAuthority(AuthorityRequestDto authorityRequestDto);
}
