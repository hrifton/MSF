/*const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");
const config = require("./DB");

module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.secret;
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.getUserById(jwt_payload.data._id, (err, user) => {
        if (err) {
          return done(err, false);
        }

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};*/
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

var User = mongoose.model("User");

passport.use(
  new localStrategy({ usernameField: "email" }, (username, password, done) => {
    console.log("password ++");
    User.findOne({ email: username }, (err, user) => {
      if (err) return done(err);
      // unknown user
      else if (!user)
        return done(null, false, { message: "Email is not registered" });
      // wrong password
      else if (!user.verifyPassword(password))
        return done(null, false, { message: "Wrong password." });
      // authentication succeeded
      else return done(null, user);
    });
  })
);
