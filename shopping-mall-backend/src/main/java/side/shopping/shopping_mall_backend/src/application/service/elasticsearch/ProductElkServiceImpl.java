package side.shopping.shopping_mall_backend.src.application.service.elasticsearch;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import side.shopping.shopping_mall_backend.global.mvc.service.redis.PopularKeywordService;
import side.shopping.shopping_mall_backend.src.domain.elasticsearch.product.ProductElkDocument;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductElkServiceImpl implements ProductElkService {

    private final ElasticsearchClient elasticsearchClient;
    private final PopularKeywordService popularKeywordService;

    @Override
    public List<ProductElkDocument> search(String searchText, int page) {
        try {
            int size = 12;
            int from = page * size;

            SearchResponse<ProductElkDocument> response = elasticsearchClient.search(s -> s
                            .index("products")
                            .from(from)
                            .size(size)
//                            .query(q -> q
//                                    .matchPhrasePrefix(m -> m
//                                            .field("name")
//                                            .query(searchText)
//                                    )
//                            ),
                            .query(q -> q
                                    .match(m -> m
                                            .field("name")
                                            .query(searchText)
                                    )
                            ),

//                            .query(q -> q.bool(b -> {
//                                for (String keyword : keywords) {
//                                    b.must(m -> m.match(mq -> mq
//                                            .field("name")
//                                            .query(keyword)
//                                    ));
//                                }
//                                return b;
//                            })),
                    ProductElkDocument.class
            );

            popularKeywordService.increaseKeyword(searchText); // 인기검색어 반영

            return response.hits().hits().stream()
                    .map(Hit::source)
                    .collect(Collectors.toList());
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }
}
