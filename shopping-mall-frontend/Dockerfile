## CI/CD github actions timeout issue
#FROM node:22-alpine

#WORKDIR /app
#COPY . .

#RUN npm install
#RUN npm run build

#EXPOSE 3000
#CMD ["npm", "run", "start"]
#-------------------------------------------

    
FROM node:22-alpine

WORKDIR /app

# 패키지 설치용 파일 복사
COPY package*.json ./
RUN npm ci --omit=dev

# 로컬에서 빌드된 결과물 포함한 전체 복사
COPY . .

# 환경변수 세팅
ENV NODE_ENV=production

# 빌드 생략! 이미 로컬에서 빌드 완료한 상태
# RUN npm run build  제거

# 서버 실행
CMD ["npm", "start"]