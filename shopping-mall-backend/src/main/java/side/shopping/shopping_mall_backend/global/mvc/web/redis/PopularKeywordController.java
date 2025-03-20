package side.shopping.shopping_mall_backend.global.mvc.web.redis;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import side.shopping.shopping_mall_backend.global.enums.EndPoint;
import side.shopping.shopping_mall_backend.global.mvc.service.redis.PopularKeywordService;

import java.util.List;

@RestController
@RequestMapping(value = EndPoint.POPULAR_KEYWORD_CONTROLLER)
@RequiredArgsConstructor
public class PopularKeywordController {
    private final PopularKeywordService popularKeywordService;

    //
    @GetMapping("/daily_popular_keywords")
    public ResponseEntity<List<String>> getTodayKeywords() {
        List<String> keywords = popularKeywordService.getTodayKeywords(10);
        return ResponseEntity.ok(keywords);
    }

    @GetMapping("/weekly_popular_keywords")
    public ResponseEntity<List<String>> getWeeklyKeywords() {
        List<String> keywords = popularKeywordService.getWeeklyKeywords(10);
        return ResponseEntity.ok(keywords);
    }
}
