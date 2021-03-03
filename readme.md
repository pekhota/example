## Import dump

Make sure that the file pubmed_articles.bson is present under ./dump directory.

```shell script
docker-compose up -d
make import 
node index.js
```

Tested with node v10.16.0