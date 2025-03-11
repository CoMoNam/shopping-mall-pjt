package side.shopping.shopping_mall_backend.global.ymlconf;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "jwt")
@Setter
@Getter
public class JwtYmlConf {
    private String secretKey;
    private long expirationTime;
}
