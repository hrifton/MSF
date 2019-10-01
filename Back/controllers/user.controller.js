const mongoose = require("mongoose");
const User = mongoose.model("User");
const passport = require("passport");
const _ = require("lodash");

module.exports.register = (req, res, next) => {
  console.log("****************************************");
    var user = new User(req.body);
 

  user.save((err, doc) => {
    
    if (!err){
      console.log("ok for save")
      res.send(doc.fullName,doc.email,doc.statut);
    } 
    else {
      console.log("Nok for save",err);
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
      //console.log(user);
      return res
        .status(404)
        .json({ status: false, message: "User record not found." });
    } else {
      //console.log(user);
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

module.exports.getUserFullName = (req, res, next) => {
  User.findOne({ fullName: req.fullName }, (err, user) => {
    if (!user) {
      //console.log(user);
      return res
        .status(404)
        .json({ status: false, message: "User record not found." });
    } else {
      //console.log(user);
      return (
        res
          .status(200)
          //recuperation des champs via lodash pick
          .json({
            status: true,
            user: _.pick(user, ["status", "fullName", "_id","idHopital"])
          })
      );
    }
  });
};

module.exports.getTech = (req, res, next) => {
  User.find({ status: "tech" }, { fullName: 1, _id: 1 }, (err, techs) => {
    if (!err) {
      res.send(techs);
    } else {
      console.log(
        "Error in Retriving Technicien : " + JSON.stringify(err, undefined, 2)
      );
    }
  });
};


module.exports.check=(req,res,next)=>{
  console.log(req.body.msfID)
  User.exists({ msfID: req.body.msfID },(err, userMSF) => {
    console.log(userMSF)
    if (!err) {
      return res.send(userMSF);
    } else {
      return res
        .status(404)
        .json({ status: false, message: "User record not found." });
    }
  });
}
module.exports.all=(req,res)=>{
  User.find((err, user) => {
    if (!err) res.send(user);
    else
      console.log("Error In Retrivings: " + JSON.stringify(err, undefined, 2));
  });
}

 