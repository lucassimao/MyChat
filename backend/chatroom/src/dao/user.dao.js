const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  nickname: String,
  email: String,
  profilePic: String
});

module.exports = mongoose.model("User", User);
