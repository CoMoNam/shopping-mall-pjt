package side.shopping.shopping_mall_backend.src.application.mapper.product;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;
import side.shopping.shopping_mall_backend.src.application.dto.product.ProductDetailDto;
import side.shopping.shopping_mall_backend.src.application.dto.product.ProductUpdateDto;
import side.shopping.shopping_mall_backend.src.domain.product.Product;
import side.shopping.shopping_mall_backend.src.application.dto.product.ProductSaveDto;

@Mapper
public interface ProductMapper {
    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

    @Mappings({
            @Mapping(source = "name", target = "name"),
            @Mapping(source = "description", target = "description"),
            @Mapping(source = "price", target = "price"),
            @Mapping(source = "quantity", target = "quantity"),
            @Mapping(source = "categoryName", target = "categoryName")
    })
    Product toProduct(ProductSaveDto productSaveDto);

    @Mappings({
            @Mapping(source = "id", target = "id"),
            @Mapping(source = "name", target = "name"),
            @Mapping(source = "description", target = "description"),
            @Mapping(source = "price", target = "price"),
            @Mapping(source = "quantity", target = "quantity"),
            @Mapping(source = "totalScore", target = "totalScore"),
            @Mapping(source = "reviewCnt", target = "reviewCnt"),
            @Mapping(source = "rating", target = "rating"),
            @Mapping(source = "sellerId", target = "sellerId"),
            @Mapping(source = "categoryName", target = "categoryName")
    })
    Product toProduct(ProductUpdateDto productUpdateDto);

    @Mappings({
            @Mapping(source = "id", target = "id"),
            @Mapping(source = "name", target = "name"),
            @Mapping(source = "description", target = "description"),
            @Mapping(source = "price", target = "price"),
            @Mapping(source = "quantity", target = "quantity"),
            @Mapping(source = "totalScore", target = "totalScore"),
            @Mapping(source = "reviewCnt", target = "reviewCnt"),
            @Mapping(source = "rating", target = "rating"),
            @Mapping(source = "sellerId", target = "sellerId"),
            @Mapping(source = "categoryName", target = "categoryName")
    })
    ProductDetailDto toProductDetailDto(Product product);
}
