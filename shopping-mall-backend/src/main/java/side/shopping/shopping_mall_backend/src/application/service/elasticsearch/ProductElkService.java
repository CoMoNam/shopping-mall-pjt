package side.shopping.shopping_mall_backend.src.application.service.elasticsearch;

import side.shopping.shopping_mall_backend.src.domain.elasticsearch.product.ProductElkDocument;

import java.util.List;

public interface ProductElkService {
    List<ProductElkDocument> search(String searchText, int page);
}
