package side.shopping.shopping_mall_backend.global.ymlconf;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "flyway-custom")
@Setter
@Getter
public class FlywayYmlConf {
    private Boolean clean_trigger;
    private Boolean migrate_trigger;
}
