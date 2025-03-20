package side.shopping.shopping_mall_backend.global.mvc.service.redis;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

// 인기 검색어 저장
@Service
@RequiredArgsConstructor
public class PopularKeywordServiceImpl implements PopularKeywordService {
    private final RedisTemplate<String, String> redisTemplate;
    private static final String KEY = "popular_keywords";

    public void increaseKeyword(String keyword) {
        // 오늘 날짜 기반 key
        String today = LocalDate.now().toString(); // 예: "2025-03-21"
        String todayKey = "popular_keywords:" + today;

        // 점수 증가
        redisTemplate.opsForZSet().incrementScore(todayKey, keyword, 1.0);

        // TTL 설정
        Long expire = redisTemplate.getExpire(todayKey);
        if (expire == null || expire <= 0) {
            redisTemplate.expire(todayKey, Duration.ofDays(7));
        }
    }

    // 오늘의 인기검색어 조회
    @Override
    public List<String> getTodayKeywords(int count) {
        String today = LocalDate.now().toString();
        String todayKey = "popular_keywords:" + today;
        Set<String> result = redisTemplate.opsForZSet().reverseRange(todayKey, 0, count - 1);
        return result != null ? new ArrayList<>(result) : List.of();
    }

    @Override
    public List<String> getWeeklyKeywords(int count) {
        // 오늘부터 7일간 키 모음
        List<String> keys = new ArrayList<>();
        for (int i = 0; i < 7; i++) {
            String key = "popular_keywords:" + LocalDate.now().minusDays(i);
            keys.add(key);
        }

        // Redis에서 합쳐질 임시 키
        String tempUnionKey = "popular_keywords:weekly";

        // ZUNIONSTORE 실행
        redisTemplate.opsForZSet().unionAndStore(
                keys.getFirst(), // base key (무시됨, 그냥 첫 번째 key 쓰는 것) (get(0) -> getFirst())
                keys.subList(1, keys.size()), // 나머지 key
                tempUnionKey
        );

        // 결과 조회 (상위 count개)
        Set<String> result = redisTemplate.opsForZSet()
                .reverseRange(tempUnionKey, 0, count - 1);

        // 임시 키 삭제 (선택적)
        redisTemplate.delete(tempUnionKey);

        return result != null ? new ArrayList<>(result) : List.of();
    }
}
