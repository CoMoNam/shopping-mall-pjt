# 1. 프론트엔드 디렉토리로 이동
cd shopping-mall-frontend

# 2. .next 제거하고 새로 빌드
rm -rf .next
npm run build:prod

# 3. 불필요한 디렉토리 제거 (LFS 문제 방지)
rm -rf .next/cache
rm -rf .next/static/development
rm -rf .next/trace

# 4. Git에 필요한 파일만 추가
cd ..
git add shopping-mall-frontend/.next

