# -------------------
# 1단계: JAR 빌드
# -------------------
FROM gradle:8.5.0-jdk21 AS builder
WORKDIR /app
COPY . .
RUN ./gradlew bootJar -x test --no-daemon

# -------------------
# 2단계: 빌드된 JAR 실행용 이미지
# -------------------
FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY --from=builder /app/build/libs/side-mall.jar side-mall.jar
ENTRYPOINT ["java", "-jar", "side-mall.jar"]