const Router = require("express").Router;
const chatroomRouter = require("./chatroom.router");

const root = Router();

root.use(chatroomRouter);

module.exports = root;
