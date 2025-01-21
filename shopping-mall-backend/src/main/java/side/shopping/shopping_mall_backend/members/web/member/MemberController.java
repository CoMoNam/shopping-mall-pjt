package side.shopping.shopping_mall_backend.members.web.member;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import side.shopping.shopping_mall_backend.members.application.dto.member.MemberDto;
import side.shopping.shopping_mall_backend.members.application.service.member.MemberService;

@RestController
@RequestMapping(value = "/api/members", consumes = {MediaType.APPLICATION_JSON_VALUE})
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/join")
    public ResponseEntity<String> join(@Valid @RequestBody MemberDto memberDto) {
        memberService.join(memberDto);
        return ResponseEntity.ok("MEMBER JOINED SUCCESSFULLY");
    }

}