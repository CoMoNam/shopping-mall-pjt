package side.shopping.shopping_mall_backend.src.web.authority;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import side.shopping.shopping_mall_backend.src.application.dto.authority.AuthorityRequestDto;
import side.shopping.shopping_mall_backend.src.application.service.authority.AuthorityService;
import side.shopping.shopping_mall_backend.global.enums.Comments;
import side.shopping.shopping_mall_backend.global.enums.EndPoint;

@RestController
@RequestMapping(value = EndPoint.AUTHORITY_CONTROLLER, consumes = {MediaType.APPLICATION_JSON_VALUE})
@RequiredArgsConstructor
public class AuthorityController {

    private final AuthorityService authorityService;

    // 권한 요청
    @PostMapping("/request")
    public ResponseEntity<String> authorityRequest(@Valid @RequestBody AuthorityRequestDto authorityRequestDto) {
        authorityService.requestAuthority(authorityRequestDto);
        return ResponseEntity.ok().body(Comments.TRANSACTION_SUCCESS.getDescriptionEn());
    }

}