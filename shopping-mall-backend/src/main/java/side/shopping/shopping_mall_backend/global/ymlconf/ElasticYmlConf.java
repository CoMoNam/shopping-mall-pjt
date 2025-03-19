package side.shopping.shopping_mall_backend.global.ymlconf;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "elasticsearch")
@Setter
@Getter
public class ElasticYmlConf {
    private String hostname;
    private Integer port;
    private String schema;
}
