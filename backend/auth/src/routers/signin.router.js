const express = require("express");
const AuthService = require("../services/auth.service");

const router = express.Router();

router.post("/signin", express.json(), async (req, res, next) => {
  const { nickname, password } = req.body;
  try {
    const jwtToken = await AuthService.doLogin(nickname, password);
    res.set("authorization", jwtToken);
    res.sendStatus(200);
  } catch (error) {
    if (typeof error == "string") {
      res.status(400).send("Wrong password or nickname");
    } else next(error);
  }
});

module.exports = router;
