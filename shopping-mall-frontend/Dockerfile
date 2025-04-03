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

# 로컬에서 빌드된 결과물, node_modules 포함 전체 복사
COPY . .

ENV NODE_ENV=production

CMD ["npm", "start"]