const express = require("express");
const db = require("./db");
const config = require("./config");
const rootRouter = require("./routers");
var cors = require("cors");

db.connect()
  .then(() => {
    const app = express();

    app.set("trust proxy", 1);

    app.use(cors());
    app.use("/", rootRouter);
    app.listen(config.port);

    console.log(`auth is listenning at ${config.port}`);
  })
  .catch(console.error);
