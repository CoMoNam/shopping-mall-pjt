package side.shopping.shopping_mall_backend.src.application.mapper.member;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;
import side.shopping.shopping_mall_backend.global.enums.Role;
import side.shopping.shopping_mall_backend.src.application.dto.member.CustomUserInfoDto;
import side.shopping.shopping_mall_backend.src.application.dto.member.JoinRequestDto;
import side.shopping.shopping_mall_backend.src.domain.member.Member;

@Mapper
public interface MemberMapper {
    MemberMapper INSTANCE = Mappers.getMapper(MemberMapper.class);

    @Mappings({
            @Mapping(target = "id", ignore = true), // 자동 생성되는 ID
            @Mapping(source = "email", target = "email"),
            @Mapping(source = "username", target = "username"),
            @Mapping(source = "nickname", target = "nickname"),
            @Mapping(source = "password", target = "password"),
            @Mapping(source = "address", target = "address"),
            @Mapping(source = "addressDetail", target = "addressDetail"),
            @Mapping(source = "addressMore", target = "addressMore"),
            @Mapping(target = "role", constant = "CUSTOMER") // 기본 역할 부여
    })
    Member toMember(JoinRequestDto joinRequestDto);

    @Mappings({
            @Mapping(source = "id", target = "id"),
            @Mapping(source = "email", target = "email"),
            @Mapping(source = "nickname", target = "nickname"),
            @Mapping(source = "role", target = "role"),
            @Mapping(target = "loggedIn", ignore = true) // 필요 시 default 처리
    })
    CustomUserInfoDto toCustomUserInfoDto(Member member);
}
