FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY . .

RUN ./gradlew build -x test --no-daemon

ARG JAR_FILE=build/libs/*.jar
COPY build/libs/side-mall.jar side-mall.jar

ENTRYPOINT ["java", "-jar", "side-mall.jar"]