const express = require("express");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");

const UserDao = require("./dao/user.dao");
const config = require("./config");
const routers = require("./routers");

var jwtStrategyOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecretKey,
  authScheme: "Bearer",
  issuer: config.domain
};

const jwtStrategy = new JwtStrategy(jwtStrategyOpts, async (jwt_payload, done) => {
  try {
    const user = await UserDao.findOne({ _id: mongoose.Types.ObjectId(jwt_payload.userId) });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
});

const app = express();

app.set("trust proxy", 1);
passport.use(jwtStrategy);

app.use(cors());
app.use(passport.initialize());
app.use(passport.authenticate("jwt", { session: false }));
app.use(helmet());
app.use("/chatrooms", routers);

module.exports = app;
