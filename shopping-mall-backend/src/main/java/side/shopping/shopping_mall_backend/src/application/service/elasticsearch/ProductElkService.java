package side.shopping.shopping_mall_backend.src.application.service.elasticsearch;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import side.shopping.shopping_mall_backend.src.domain.elasticsearch.product.ProductElkDocument;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductElkService {

    private final ElasticsearchClient elasticsearchClient;

    public List<ProductElkDocument> search(String searchText) throws IOException {
        SearchResponse<ProductElkDocument> response = elasticsearchClient.search(s -> s
                        .index("products")
                        .size(12)
                        .query(q -> q
                                .matchPhrasePrefix(m -> m
                                        .field("name")
                                        .query(searchText)
                                )
                        ),
                ProductElkDocument.class
        );

        return response.hits().hits().stream()
                .map(Hit::source)
                .collect(Collectors.toList());
    }
}
