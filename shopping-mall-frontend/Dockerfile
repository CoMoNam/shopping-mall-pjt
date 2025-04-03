## CI/CD github actions timeout issue
#FROM node:22-alpine

#WORKDIR /app
#COPY . .

#RUN npm install
#RUN npm run build

#EXPOSE 3000
#CMD ["npm", "run", "start"]
#-------------------------------------------

    
# Node.js 운영 이미지
FROM node:22-alpine

# 작업 디렉토리
WORKDIR /app

# 정적 파일만 복사 (이미 빌드 완료된 결과물만)
COPY .next .next
COPY public public
COPY package.json .
COPY .env.prod .env.production

# 필요시 서버 스타트용 모듈 설치 (선택)
RUN npm install --omit=dev

# 실행
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]