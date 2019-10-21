if (!process.env.MONGO_DB_URL) throw "Mongo db url was not provided!";

if (!process.env.HTTP_PORT) throw "Http server port must be provided!";

module.exports = {
  dbUrl: process.env.MONGO_DB_URL,
  port: process.env.HTTP_PORT,
  httpDomain: `https://mychat.com`
};
