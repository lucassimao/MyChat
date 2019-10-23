const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  nickname: String,
  email: String,
  profilePic: String,
  offsets: [{ roomId: { type: String }, value: { type: Number } }]
});

module.exports = mongoose.model("User", User);
