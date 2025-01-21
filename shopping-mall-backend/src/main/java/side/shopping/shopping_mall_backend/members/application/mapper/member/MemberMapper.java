package side.shopping.shopping_mall_backend.members.application.mapper.member;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import side.shopping.shopping_mall_backend.members.application.dto.member.MemberDto;
import side.shopping.shopping_mall_backend.members.domain.member.Member;

@Mapper
public interface MemberMapper {
    MemberMapper INSTANCE = Mappers.getMapper(MemberMapper.class);

    MemberDto toMemberDto(Member member);
    Member toMember(MemberDto memberDto);
}
