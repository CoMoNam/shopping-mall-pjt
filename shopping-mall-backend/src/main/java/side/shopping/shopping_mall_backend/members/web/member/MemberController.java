package side.shopping.shopping_mall_backend.members.web.member;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import side.shopping.shopping_mall_backend.global.enums.api.EndPoint;
import side.shopping.shopping_mall_backend.global.enums.logs.Comments;
import side.shopping.shopping_mall_backend.members.application.dto.member.JoinRequestDto;
import side.shopping.shopping_mall_backend.members.application.dto.member.LoginRequestDto;
import side.shopping.shopping_mall_backend.members.application.service.member.MemberService;

@RestController
@RequestMapping(value = EndPoint.MEMBER_CONTROLLER, consumes = {MediaType.APPLICATION_JSON_VALUE})
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/join")
    public ResponseEntity<String> join(@Valid @RequestBody JoinRequestDto joinRequestDto) {
        memberService.join(joinRequestDto);
        return ResponseEntity.ok(Comments.MEMBER_JOIN_SUCCESS.getDescriptionEn());
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody LoginRequestDto loginRequestDto) {
        return ResponseEntity.ok(memberService.login(loginRequestDto));
    }
}