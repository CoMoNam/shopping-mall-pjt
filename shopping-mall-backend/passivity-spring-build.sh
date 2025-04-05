./gradlew clean build -x test --no-build-cache -Dspring.profiles.active=prod
scp build/libs/side-mall.jar root@side-mall.store:/root/spring-backend/

