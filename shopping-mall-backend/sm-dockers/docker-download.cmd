#docker pull mysql
docker-compose up -d
docker-compose exec solr bin/solr create_core -c mycore