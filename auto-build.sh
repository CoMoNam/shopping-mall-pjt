#!/bin/bash

echo "✅ node js build ..."
./passivity-nodejs-build.sh

echo "✅ springboot build ..."
cd shopping-mall-backend
./gradlew clean build -x test --no-build-cache -Dspring.profiles.active=prod
scp build/libs/side-mall.jar root@side-mall.store:/root/spring-backend/
cd ..

echo "✅ nextjs build ..."
./passivity-next-build.sh

echo "✅ Finished ! "
