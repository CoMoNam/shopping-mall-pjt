package side.shopping.shopping_mall_backend.members.web.member;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import side.shopping.shopping_mall_backend.global.enums.api.EndPoint;
import side.shopping.shopping_mall_backend.global.enums.logs.Comments;
import side.shopping.shopping_mall_backend.members.application.dto.member.JoinRequestDto;
import side.shopping.shopping_mall_backend.members.domain.member.Member;
import side.shopping.shopping_mall_backend.members.infrastructure.persistence.member.MemberRepository;
import side.shopping.shopping_mall_backend.util.TestDataUtil;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest // 실제 애플리케이션 컨텍스트를 로드하고 통합 테스트 수행
@Transactional // DB를 안전하게 롤백
@AutoConfigureMockMvc
class MemberControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private MemberRepository memberRepository;

    ObjectMapper objectMapper = new ObjectMapper();

    @Test
    @DisplayName("여러 테스트 회원 및 테스트 단일회원을 저장하고 조회 테스트")
    void testMultipleMembers() {
        JoinRequestDto joinRequestDto = TestDataUtil.createMember();
        assertNotNull(joinRequestDto);
        assertEquals("강짱구", joinRequestDto.getNickname());

        List<JoinRequestDto> joinRequestDtoList = TestDataUtil.createMembers(5);
        assertEquals(5, joinRequestDtoList.size());
        assertEquals("강짱구5", joinRequestDtoList.get(4).getNickname());
    }

    @Test
    @DisplayName("회원 가입 성공")
    void join_o() throws Exception {
        // Given
        JoinRequestDto joinRequestDto = TestDataUtil.createMember();

        String jsonRequest = objectMapper.writeValueAsString(joinRequestDto);

        // When & Then
        mockMvc.perform(post(EndPoint.MEMBER_CONTROLLER + "/join")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest))
                .andExpect(status().isOk())
                .andExpect(content().string(Comments.MEMBER_JOIN_SUCCESS.getDescriptionEn()));

        //가입 후 실제 DB에서 회원 데이터 확인
        Optional<Member> member = memberRepository.findByNickname(joinRequestDto.getNickname());

        //DB에 삽입된 데이터 확인 -> 추가적으로 확인
        member.ifPresent(value -> assertThat(value.getEmail()).isEqualTo(joinRequestDto.getEmail()));
    }

//        @Test // 회원가입 실패 - nickname 이 길어서
//        public void join_length_x() throws Exception {
//            //요청 회원 정보
//            User joinMember = new User();
//            joinMember.setEmail("user@sample.com");
//            joinMember.setUsername("홍길동");
//            joinMember.setNickname("개발마스터1111111111111111111111111"); // 길게 입력
//            joinMember.setPassword("password123");
//            joinMember.setAddress("서울시 마포구 부자동");
//            joinMember.setAddressDetail("한강뷰 아파트 103동 105호");
//            joinMember.setAddressMore("현관문 비밀번호 #0000");
//            joinMember.setUserType(null);
//
//            ObjectMapper objectMapper = new ObjectMapper();
//            String requestBody = objectMapper.writeValueAsString(joinMember);
//
//            mockMvc.perform(post("/api/common_logics/member/join")
//                            .contentType(MediaType.APPLICATION_JSON)
//                            .content(requestBody))
//                    .andExpect(status().isBadRequest())
//                    .andDo(print());
////                .andExpect(jsonPath("$.message").value("VALIDATION FAILED"))
////                .andExpect(jsonPath("$.errors.nickname").value("NICKNAME MUST BE 1 - 20 LENGTH"));
//        }
}