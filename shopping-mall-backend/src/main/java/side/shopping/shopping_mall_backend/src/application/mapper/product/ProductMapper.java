package side.shopping.shopping_mall_backend.src.application.mapper.product;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;
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
    })
    Product toProduct(ProductSaveDto productSaveDto);
}
