const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Chatroom = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, trim: true },
  participants: [Schema.Types.ObjectId],
  owner: { type: Schema.Types.ObjectId, required: true, index: true },
  dateCreated: { type: Date, default: Date.now },
  pic: String
});

module.exports = mongoose.model("Chatroom", Chatroom);
