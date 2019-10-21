const db = require("./db");
const config = require("./config");
const server = require('./server');

db.connect()
  .then(() => {
    server.listen(config.port);
    console.log(`chatrooms service is listenning at ${config.port}`);
  })
  .catch(console.error);
