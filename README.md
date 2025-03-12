# shopping-mall-project (계속 업데이트 진행)

# 설명 

쇼핑몰을 기반한 여러 백엔드 기술 구현 및 테스트

# Backend 환경

- Springboot framework
- JDK 21 version
- Mysql 8
- Docker 설치 (Mysql, Solr, Redis, ElasticSearch, Kibana, Logstash)
- 데이터베이스 관리 -> flyway migration 으로 관리 , jpa ddl-auto : none

# Frontend 환경

- Next.js
- Typescript
- Npm
- 데이터 관리 redux , rtk 사용

# 기능 

- 회원가입
- Login / Logout (Spring Security Jwt Token) , XSS 공격 방지 HttpOnly 쿠키 방식
- 상품 관리 (상품 등록, 조회, 통계 차트) // 진행중
