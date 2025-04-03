# 🛒 쇼핑몰 시스템 (Next.js + Spring Boot)

Next.js(App Router)와 Spring Boot 기반의 쇼핑몰 플랫폼입니다.  
JWT 기반 인증, 상품 관리, 검색 기능(Elasticsearch), 판매자 페이지 등 실무에 가까운 구조로 구현했습니다.

---

## 🚀 기술 스택

### Frontend

- _Next.js 15 (App Router)_
- _TypeScript**, **Redux Toolkit (전역 상태 관리)_
- _Tailwind CSS_
- _JWT 인증 (httpOnly 쿠키 기반)_

### Backend

- _Java 21_, _Spring Boot 3_
- _Spring Security (JWT)_
- _JPA (DDL-auto: none)_, _Flyway (DB 마이그레이션)_
- *MySQL 8\*\*, *Elasticsearch + Kibana*, *Docker\*

---

## 🧩 주요 기능

### 🔐 인증 / 보안

- JWT 기반 로그인 / 로그아웃
- httpOnly 쿠키 기반 인증 처리
- 인증 상태 Redux로 전역 상태 관리

### 🎁 상품 관리 (판매자 전용)

- 상품 등록 / 수정 / 삭제 기능
- 판매자 페이지 분리
- JPA 기반 페이징 처리

### 🔎 검색

- Elasticsearch + Nori 형태소 분석기 적용
- 상품명 기반 실시간 검색 기능
- Docker 기반 ELK 구성

### ⚙️ 시스템 운영

- Flyway 기반 DB 마이그레이션 관리
- Docker Compose로 통합 운영 환경 구성 (MySQL, Elasticsearch, Kibana)

---

## 👨‍💻 구현 내용

| 항목               | 설명                                                                  |
| ------------------ | --------------------------------------------------------------------- |
| 전체 프로젝트 설계 | 프론트/백엔드 디렉토리 구조 및 기술 스택 설계                         |
| 인증/보안          | JWT + httpOnly 쿠키 기반 인증 및 로그인 상태 전역관리                 |
| 상품관리 기능      | 판매자 상품 등록/수정/조회 기능 및 페이징                             |
| 검색 기능          | Elasticsearch + 형태소 분석기 연동, 검색 API 구현, 무한 스크롤 페이징 |
| DB 마이그레이션    | Flyway 적용, 운영 환경 DB 버전 관리                                   |
| 인프라 구성        | Docker 기반 서비스 운영 환경 구성 (MySQL + ELK)                       |

---

## 📌 향후 개발 예정

- [ ] 상품 구매 프로세스 전체 로직 개발
- [ ] Web3 기능 도입 (지갑 로그인, 토큰 결제 + 보상 등)
- [ ] 관리자 페이지 구현 및 권한 분기 처리

---

## 추가 내용

- 추가적인 사항은 docs 디렉토리에 작성.
