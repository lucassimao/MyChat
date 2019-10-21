const mongoose = require("mongoose");
const process = require("process");
const config = require("./config");

let isConnected = false;

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

mongoose.connection.on("error", error => {
  console.log("There was a problem establishing db connection");
  console.error(error);
  process.exit(-1);
});

mongoose.connection.on("disconnected", function() {
  // console.log('Mongoose default connection to DB disconnected');
  isConnected = false;
});

mongoose.connection.once("open", function() {
  // console.log('MongoDB connection is open! ');
  isConnected = true;
});

module.exports = {
  connect: async () => {
    if (!isConnected) await mongoose.connect(config.dbUrl, config.dbOptions);
  },
  disconnect: async callback => {
    if (isConnected) await mongoose.connection.close(callback);
  }
};
