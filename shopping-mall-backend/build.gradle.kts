plugins {
	java
	id("org.springframework.boot") version "3.4.0"
	id("io.spring.dependency-management") version "1.1.6"
}

group = "side.shopping"
version = "0.0.1-SNAPSHOT"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(21)
	}
}

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-jdbc")
	implementation("org.springframework.boot:spring-boot-starter-security")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-validation") // 유효성검증

	implementation ("org.mapstruct:mapstruct:1.5.5.Final")
	implementation("org.modelmapper:modelmapper:3.1.1")

	implementation("io.jsonwebtoken:jjwt-api:0.11.5")
	implementation("io.jsonwebtoken:jjwt-impl:0.11.5")
	implementation("io.jsonwebtoken:jjwt-jackson:0.11.5")

	implementation("org.flywaydb:flyway-core")
	implementation("org.flywaydb:flyway-mysql")

	implementation("org.springframework.boot:spring-boot-starter-data-elasticsearch")
	implementation("co.elastic.clients:elasticsearch-java:8.11.1")

	implementation("org.springframework.boot:spring-boot-starter-data-redis")
	implementation("org.apache.commons:commons-pool2")


	compileOnly("org.projectlombok:lombok")

	runtimeOnly("com.mysql:mysql-connector-j")

	annotationProcessor("org.projectlombok:lombok")
	annotationProcessor ("org.mapstruct:mapstruct-processor:1.5.5.Final") // MapStruct 프로세서

	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.springframework.security:spring-security-test")
	testImplementation("org.mockito:mockito-core:5.7.0")

	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.jar {
	enabled = false
}

tasks.bootJar {
	archiveFileName.set("side-mall.jar")
	destinationDirectory.set(file("$buildDir/libs"))
}

tasks.withType<Test> {
	useJUnitPlatform()
}
