# FROM node:22-alpine

# # 작업 디렉토리 설정
# WORKDIR /app

# # package.json 복사 후 의존성 설치
# COPY package.json ./
# COPY package-lock.json ./
# RUN npm ci

# # 전체 소스 복사
# COPY . .

# # 환경 설정
# ENV NODE_ENV=production

# # 애플리케이션 빌드 (필요시: TypeScript나 Babel을 사용하는 경우에만 build 단계가 필요)
# # RUN npm run build

# # 서버 실행
# CMD ["node", "server.js"]