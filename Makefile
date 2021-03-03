import:
	docker-compose exec mongo mongorestore --authenticationDatabase admin -u 'root' -p 'example' -d test1 -c coll1 /dump/pubmed_articles.bson

up:
	docker-compose up -d

down:
	docker-compose down