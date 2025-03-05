package side.shopping.shopping_mall_backend.customer.application.mapper.authority;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import side.shopping.shopping_mall_backend.customer.application.dto.authority.AuthorityRequestDto;
import side.shopping.shopping_mall_backend.customer.domain.authority.AuthorityRequest;

@Mapper
public interface AuthorityMapper {
    AuthorityMapper INSTANCE = Mappers.getMapper(AuthorityMapper.class);

    AuthorityRequest toAuthorityRequest(AuthorityRequestDto authorityRequestDto);
}
