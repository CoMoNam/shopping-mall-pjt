package side.shopping.shopping_mall_backend.src.application.service.authority;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import side.shopping.shopping_mall_backend.src.application.dto.authority.AuthorityRequestDto;
import side.shopping.shopping_mall_backend.src.application.mapper.authority.AuthorityMapper;
import side.shopping.shopping_mall_backend.src.infrastructure.persistence.authority.AuthorityRequestRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthorityServiceImpl implements AuthorityService {
    private final AuthorityRequestRepository authorityRequestRepository;

    @Override
    public void requestAuthority(AuthorityRequestDto authorityRequestDto) {
        authorityRequestRepository.save(AuthorityMapper.INSTANCE.toAuthorityRequest(authorityRequestDto));
    }
}
