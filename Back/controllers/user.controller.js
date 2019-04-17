const mongoose = require("mongoose");
const User = mongoose.model("User");
const passport = require("passport");
const _ = require("lodash");

module.exports.register = (req, res, next) => {
  var user = new User();
  user.fullName = req.body.fullName;
  user.email = req.body.email;
  user.password = req.body.password;
  user.status = "user";

  user.save((err, doc) => {
    if (!err) res.send(doc);
    else {
      console.log(err);
      if (err.code === 11000) res.status(422).send(["Duplicate email."]);
      else return next(err);
    }
  });
};

module.exports.authenticate = (req, res, next) => {
  // call for passport authentication
  passport.authenticate("local", (err, user, info) => {
    // error from passport middleware
    if (err) return res.status(404).json(err);
    // registered user
    if (user) return res.status(200).json({ token: user.generateJwt() });
    // unknown user or wrong password
    else return res.status(401).json(info);
  })(req, res);
};

module.exports.userProfile = (req, res, next) => {
  User.findOne({ _id: req._id }, (err, user) => {
    if (!user) {
      console.log(user);
      return res
        .status(404)
        .json({ status: false, message: "User record not found." });
    } else {
      console.log(user);
      return (
        res
          .status(200)
          //recuperation des champs via lodash pick
          .json({
            status: true,
            user: _.pick(user, ["status", "fullName"])
          })
      );
    }
  });
};

module.exports.getTech = (req, res, next) => {
  User.find({ status: "tech" }, { fullName: 1, _id: 0 }, (err, techs) => {
    if (!err) {
      res.send(techs);
    } else {
      console.log(
        "Error in Retriving Technicien : " + JSON.stringify(err, undefined, 2)
      );
    }
  });
};
