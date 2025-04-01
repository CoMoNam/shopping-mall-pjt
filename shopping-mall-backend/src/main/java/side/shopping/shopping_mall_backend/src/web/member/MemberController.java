package side.shopping.shopping_mall_backend.src.web.member;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import side.shopping.shopping_mall_backend.global.enums.EndPoint;
import side.shopping.shopping_mall_backend.global.enums.Comments;
import side.shopping.shopping_mall_backend.global.util.security.JwtUtil;
import side.shopping.shopping_mall_backend.src.application.dto.member.JoinRequestDto;
import side.shopping.shopping_mall_backend.src.application.dto.member.LoginRequestDto;
import side.shopping.shopping_mall_backend.src.application.dto.member.WalletLoginRequest;
import side.shopping.shopping_mall_backend.src.application.service.member.MemberService;

@RestController
@RequestMapping(value = EndPoint.MEMBER_CONTROLLER, consumes = {MediaType.APPLICATION_JSON_VALUE})
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final JwtUtil jwtUtil;

    @PostMapping("/join")
    public ResponseEntity<String> join(@Valid @RequestBody JoinRequestDto joinRequestDto) {
        memberService.join(joinRequestDto);
        return ResponseEntity.ok(Comments.TRANSACTION_SUCCESS.getDescriptionEn());
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(@Valid @RequestBody LoginRequestDto loginRequestDto) {
        return memberService.login(loginRequestDto);
    }

    @PostMapping("/wallet-login")
    public ResponseEntity<?> walletLogin(@RequestBody WalletLoginRequest walletLoginRequest) {
        String address = walletLoginRequest.getAddress();
        return memberService.walletLogin(address);
    }

}