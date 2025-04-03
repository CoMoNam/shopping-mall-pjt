set -e

cd shopping-mall-frontend

npm i

rm -rf .next

npm run build:prod

rm -rf .next/cache
rm -rf .next/static/development
rm -rf .next/trace

cd ..
git add shopping-mall-frontend/.next

