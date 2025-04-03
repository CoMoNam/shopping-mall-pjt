package side.shopping.shopping_mall_backend.global.ymlconf;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@ConfigurationProperties(prefix = "cors")
@Setter
@Getter
public class CorsYmlConf {
    private List<String> allowedOrigins;
}
