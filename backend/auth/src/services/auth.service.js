const bcrypt = require("bcrypt");
const jwtBuilder = require("jwt-builder");
const UserDao = require("../dao/user.dao");
const config = require("../config");

/**
 *
 * @param {String} nickname User's nick name
 * @param {String} email User's email. It'll be used as his login
 * @param {String} password User password. The plain password won't be stored, It'll be hashed
 *
 * @returns {Promise} Promise to be resolved to the new user registered on the database
 */
const register = (nickname, email, password) => {
  if (isStringEmpty(password)) {
    return Promise.reject("A password must be provided");
  }

  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, function(err, hash) {
      if (err) reject(err);
      else resolve(hash);
    });
  }).then(encrypted_password =>
    UserDao.create({ nickname, email, encrypted_password })
  );
};

/**
 *
 * @param {String} email User email, used as username
 * @param {String} password User password
 *
 * @returns {Promise} Promise to be resolved to the jwt token that will allow the user to send authenticated requests
 */
const doLogin = (nickname, password) => {
  if (isStringEmpty(nickname) || isStringEmpty(password)) {
    return Promise.reject("nickname and password must be provided");
  }

  return UserDao.findOne({ nickname }, "encrypted_password")
    .exec()
    .then(user => {
      if (!user) {
        throw "user not found";
      }
      const doesMatch = bcrypt.compareSync(password, user.encrypted_password);
      if (doesMatch) {
        return user;
      } else {
        throw "wrong password";
      }
    })
    .then(user => {
      return jwtBuilder({
        algorithm: "HS256",
        secret: config.jwtSecretKey,
        iat: true,
        nbf: true,
        exp: (60*60*24*365), // 1 year in seconds
        iss: config.domain,
        userId: user._id,
        claims: {
          role: "user"
        }
      });
    });
};

const isStringEmpty = string => !string || string.trim().length == 0;

const removeAccount = email => UserDao.deleteMany({ email });

module.exports = { register, doLogin, removeAccount };
