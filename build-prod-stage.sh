set -e

cd shopping-mall-frontend

rm -rf .next

npm run build:prod


rm -rf .next/cache
rm -rf .next/static/development
rm -rf .next/trace

rm -rf node_modules
npm install --omit=dev

cd ..
git add shopping-mall-frontend/.next

