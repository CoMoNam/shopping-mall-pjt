FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY . .

RUN ./gradlew build --no-daemon

ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} side-mall.jar

ENTRYPOINT ["java", "-jar", "side-mall.jar"]