const express = require("express");
const app = express();
const signupRouter = require("./signup.router");
const signinRouter = require("./signin.router");

app.use(signupRouter);
app.use(signinRouter);

module.exports = app;
