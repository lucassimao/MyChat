const env = process.env.NODE_ENV || "development";

if (env == "production" && !process.env.JWT_SECRET_KEY)
  throw "Jwt secret key must be provided as an environment variable in production";

const baseConfig = {
  env,
  isDev: env == "development",
  isTest: env == "test",
  defaultPageSize: 10,
  domain: "https://mychat.com",
  jwtSecretKey: process.env.JWT_SECRET_KEY || "112358132134",
  dbOptions: {
    useNewUrlParser: true,
    auto_reconnect: true,
    useUnifiedTopology: true
  },
  httpOptions: {
    enableCompression: process.env.ENABLE_COMPRESSION == "true"
  }
};

let envConfig = {};

switch (env) {
  case "development":
    envConfig = require("./dev");
    break;
  case "test":
    envConfig = require("./testing");
    break;
  case "production":
    envConfig = require("./production");
}

module.exports = Object.assign(baseConfig, envConfig);
