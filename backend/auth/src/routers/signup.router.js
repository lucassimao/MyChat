const express = require("express");
const AuthService = require("../services/auth.service");

const router = express.Router();

router.post("/signup", express.json(), async (req, res, next) => {
  const { email, password, nickname } = req.body;
  try {
    await AuthService.register(nickname, email, password);
    res.sendStatus(200);
  } catch (error) {
    switch (error.name) {
      case "MongoError":
        if (error.code === 11000 && "email" in error.keyPattern) {
          res.status(400).send("Email already exists");
        }
        if (error.code === 11000 && "nickname" in error.keyPattern) {
          res.status(400).send("Nickname has been already taken");
        }
        break;
      case "ValidationError":
        res.status(400);

        if ("email" in error.errors) {
          res.send(error.errors.email.message);
        } else if ("nickname" in error.errors) {
          res.send(error.errors.nickname.message);
        } else {
          res.send(error.message);
        }
        break;
      default:
        console.error(error);
        next(error);
    }
  }
});

module.exports = router;
