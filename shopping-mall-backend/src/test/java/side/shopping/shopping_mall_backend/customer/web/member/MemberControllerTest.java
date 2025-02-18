package side.shopping.shopping_mall_backend.customer.web.member;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;
import side.shopping.shopping_mall_backend.global.enums.api.EndPoint;
import side.shopping.shopping_mall_backend.global.enums.logs.Comments;
import side.shopping.shopping_mall_backend.global.enums.member.Role;
import side.shopping.shopping_mall_backend.global.util.security.JwtUtil;
import side.shopping.shopping_mall_backend.customer.application.dto.member.JoinRequestDto;
import side.shopping.shopping_mall_backend.customer.application.dto.member.LoginRequestDto;
import side.shopping.shopping_mall_backend.customer.domain.member.Member;
import side.shopping.shopping_mall_backend.customer.infrastructure.persistence.member.MemberRepository;
import side.shopping.shopping_mall_backend.util.TestDataUtil;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
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

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("회원가입 - 임시회원 정보 생성")
    void create_member_o() {
        JoinRequestDto joinRequestDto = TestDataUtil.createMember();
        assertNotNull(joinRequestDto);
        assertEquals("강짱구", joinRequestDto.getNickname());

        List<JoinRequestDto> joinRequestDtoList = TestDataUtil.createMembers(5, 3, 2); // 강짱구1~5 까지 생성
        assertEquals(10, joinRequestDtoList.size());
    }

    @Test
    @DisplayName("회원가입 - 회원 가입 로직 성공")
    void join_o() throws Exception {

        JoinRequestDto joinRequestDto = TestDataUtil.createMember();

        String jsonRequest = objectMapper.writeValueAsString(joinRequestDto);

        mockMvc.perform(post(EndPoint.MEMBER_CONTROLLER + "/join")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequest))
                .andExpect(status().isOk())
                .andExpect(content().string(Comments.MEMBER_JOIN_SUCCESS.getDescriptionEn()));

        //가입 후 실제 DB에서 회원 데이터 확인
        Optional<Member> member = memberRepository.findByNickname(joinRequestDto.getNickname());

        member.ifPresent(value -> {
            assertThat(value.getEmail()).isEqualTo(joinRequestDto.getEmail()); // DB에 삽입된 데이터 확인 -> 추가적으로 확인
            assertThat(value.getRole()).isEqualTo(Role.CUSTOMER); // 최초 회원가입 된 고객의 역할 = CUSTOMER
        });
    }

    @Test
    @DisplayName("로그인 - 로그인 로직 성공")
    void login_o() throws Exception {
        // 회원가입 진행
        JoinRequestDto joinRequestDto = TestDataUtil.createMember();

        String jsonRequest = objectMapper.writeValueAsString(joinRequestDto);

        mockMvc.perform(post(EndPoint.MEMBER_CONTROLLER + "/join")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequest));

        // 로그인 진행
        LoginRequestDto loginRequestDto = new LoginRequestDto(joinRequestDto.getEmail(), joinRequestDto.getPassword());

        String jsonRequest2 = objectMapper.writeValueAsString(loginRequestDto);

        MvcResult result = mockMvc.perform(post(EndPoint.MEMBER_CONTROLLER + "/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequest2))
                .andExpect(status().isOk())
                .andReturn();

        String jwtToken = result.getResponse().getContentAsString();

        // JWT 토큰 검증
        assertNotNull(jwtToken); // 토큰이 null이 아닌지 확인
        assertTrue(jwtUtil.isValidToken(jwtToken)); // 토큰이 유효한지 확인

        // JWT 토큰에 email(정보) 확인
        String nickname = jwtUtil.parseClaims(jwtToken).get("nickname", String.class);
        assertEquals(joinRequestDto.getNickname(), nickname);
    }
}