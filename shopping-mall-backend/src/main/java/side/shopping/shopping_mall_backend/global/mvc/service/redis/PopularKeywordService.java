package side.shopping.shopping_mall_backend.global.mvc.service.redis;

import java.util.List;

public interface PopularKeywordService {
    List<String> getTodayKeywords(int count);
    List<String> getWeeklyKeywords(int count);
    void increaseKeyword(String keyword);
}
