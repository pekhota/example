module.exports = {
  app: {
    // https://www.regextester.com/19
    email_regex : /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/ig,
    query_limit : 100
  },
  mongodb: {
    uri: "mongodb://root:example@localhost:27017/",
    dbName: "test1",
    collectionName: "coll1"
  }
}