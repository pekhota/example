const { MongoClient } = require("mongodb");
const conf = require("./config")
const helpers = require("./helpers")

const stringSimilarity = require("string-similarity");

const client = new MongoClient(conf.mongodb.uri);

async function run() {
  try {
    await client.connect();

    // for test purpose I've set the limit
    const cursor = await client.db(conf.mongodb.dbName)
      .collection(conf.mongodb.collectionName).find().limit(conf.app.query_limit)

    let authorsMap = {}
    let document
    while ((document = await cursor.next())) {
      if (document.hasOwnProperty("authors")) {
        document.authors.forEach(author => {
          if (!author.hasOwnProperty("affiliation")) {
            return
          }

          const emails = helpers.parseEmails(author.affiliation)
          if (!Array.isArray(emails)) {
            return;
          }

          let bestEmail
          if (emails.length > 1) {
            let similarityArr = []
            for(let i = 0; i<emails.length; i++) {
              const email = emails[i]
              const similarity = stringSimilarity.compareTwoStrings(email, author.full_author);
              similarityArr.push(similarity)
            }

            bestEmail = emails[helpers.indexOfMax(similarityArr)]
          } else {
            bestEmail = emails[0]
          }

          if (!authorsMap.hasOwnProperty(bestEmail)) {
            const lastAndFirstName = author.full_author.split(', ');
            authorsMap[bestEmail] = {
              "article_ids" : [document["_id"]],
              "email" : bestEmail,
              "last_name"  : lastAndFirstName[0],
              "first_name" : lastAndFirstName[1]
            }
          } else {
            if (authorsMap[bestEmail]["article_ids"].indexOf(document["_id"]) === -1) {
              authorsMap[bestEmail]["article_ids"].push(document["_id"])
            }
          }
        })
      }
    }

    console.log(authorsMap)
  } finally {
    await client.close();
  }
}
run().catch(console.dir);