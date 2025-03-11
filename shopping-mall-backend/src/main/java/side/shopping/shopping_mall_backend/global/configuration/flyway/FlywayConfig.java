package side.shopping.shopping_mall_backend.global.configuration.flyway;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationStrategy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FlywayConfig {
    @Value("${flyway-custom.clean_trigger}")
    private Boolean clean_trigger;
    @Value("${flyway-custom.migrate_trigger}")
    private Boolean migrate_trigger;

    @Bean
    public FlywayMigrationStrategy cleanMigrateStrategy() {
        if (migrate_trigger && !clean_trigger) {
            return flyway -> {
//                flyway.repair();
                flyway.migrate();
            };
        } else if (!migrate_trigger && clean_trigger) {
            return flyway -> {
//                flyway.repair();
                flyway.clean();
            };
        } else if (migrate_trigger  && clean_trigger) {
            return flyway -> {
                flyway.clean();
//                flyway.repair();
                flyway.migrate();

            };
        } else {
            return null;
        }
    }
}