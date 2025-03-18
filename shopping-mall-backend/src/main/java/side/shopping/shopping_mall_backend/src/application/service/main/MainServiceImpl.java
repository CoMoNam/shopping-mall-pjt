package side.shopping.shopping_mall_backend.src.application.service.main;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import side.shopping.shopping_mall_backend.src.domain.product.Product;
import side.shopping.shopping_mall_backend.src.infrastructure.persistence.product.ProductRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MainServiceImpl implements MainService {
    private final ProductRepository productRepository;


    @Override
    public List<Product> getReentProductList() {
        return productRepository.findTop8ByOrderByUpdatedAtDesc();
    }
}
