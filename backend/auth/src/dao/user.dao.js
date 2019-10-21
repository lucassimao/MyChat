const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const User = new Schema(
  {
    nickname: {type: String, required: true, unique: true,trim: true},
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: [validator.isEmail, "A valid email must be used as your account login"]
    },
    encrypted_password:  {type: String, required: true},
    dateCreated: { type: Date, default: Date.now },
    profilePic: String
  }
);

module.exports = mongoose.model("User", User);
