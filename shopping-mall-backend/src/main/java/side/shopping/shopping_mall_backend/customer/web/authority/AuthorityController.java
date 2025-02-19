package side.shopping.shopping_mall_backend.customer.web.authority;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import side.shopping.shopping_mall_backend.customer.application.service.authority.AuthorityService;
import side.shopping.shopping_mall_backend.global.enums.api.EndPoint;

@RestController
@RequestMapping(value = EndPoint.AUTHORITY_CONTROLLER, consumes = {MediaType.APPLICATION_JSON_VALUE})
@RequiredArgsConstructor
public class AuthorityController {

    private final AuthorityService authorityService;
}
