const DEV_SERVER_PORT = 3000;

module.exports = {
  dbUrl: "mongodb://localhost:27017/mychat-dev",
  port: DEV_SERVER_PORT,
  httpDomain: `http://localhost:${DEV_SERVER_PORT}`
};
