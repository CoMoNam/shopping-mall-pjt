package side.shopping.shopping_mall_backend.members.application.mapper.member;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;
import side.shopping.shopping_mall_backend.members.application.dto.member.CustomUserInfoDto;
import side.shopping.shopping_mall_backend.members.application.dto.member.JoinRequestDto;
import side.shopping.shopping_mall_backend.members.application.dto.member.MemberDto;
import side.shopping.shopping_mall_backend.members.domain.member.Member;

@Mapper
public interface MemberMapper {
    MemberMapper INSTANCE = Mappers.getMapper(MemberMapper.class);

    @Mappings({
            @Mapping(source = "email", target = "email"),
            @Mapping(source = "username", target = "username"),
            @Mapping(source = "nickname", target = "nickname"),
            @Mapping(source = "password", target = "password"),
            @Mapping(source = "address", target = "address"),
            @Mapping(source = "addressDetail", target = "addressDetail"),
            @Mapping(source = "addressMore", target = "addressMore"),
    })
    Member toMember(JoinRequestDto joinRequestDto);

    @Mappings({
            @Mapping(source = "id", target = "id"),
            @Mapping(source = "email", target = "email"),
            @Mapping(source = "nickname", target = "nickname"),
            @Mapping(source = "role", target = "role"),
    })
    CustomUserInfoDto toCustomUserInfoDto(Member member);
}
