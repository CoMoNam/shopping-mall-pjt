FROM eclipse-temurin:21-jdk

ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} side-mall.jar
ENTRYPOINT ["java", "-jar", "/side-mall.jar", "--spring.profiles.active=dev"]
