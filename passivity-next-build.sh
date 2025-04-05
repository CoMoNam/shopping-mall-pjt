cd shopping-mall-frontend
npm run build
cd ..
tar -czf side-mall-frontend.tar.gz shopping-mall-frontend
scp side-mall-frontend.tar.gz root@side-mall.store:/root/nextjs-frontend
