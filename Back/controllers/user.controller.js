const mongoose = require("mongoose");
const User = mongoose.model("User");
const passport = require("passport");
const { ObjectId } = require("mongodb");
const _ = require("lodash");

module.exports.register = (req, res, next) => {
  console.log("****************************************");
  var user = new User(req.body);
  user.status = req.body.statut;
  console.log(req.body, user);
  console.log(user);
  //user.fullName = req.body.fullName;
  //user.email = req.body.email;
  //user.password = req.body.password;

  user.save((err, doc) => {
    if (!err) {
      res.send(doc.fullName, doc.email, doc.statut);
    } else {
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

module.exports.getUser = (req, res, next) => {
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
            user: _.pick(user, ["status", "fullName", "_id", "idHopital"])
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

module.exports.FindUserByHospital = (req, res) => {
 
  User.find(
    { idHopital: ObjectId(req.id) },
    { fullName: 1, _id: 1, status: 1,departements:1 },
    (err, users) => {
      if (!err) {
        console.log(users)
      res.status("200").send(users);
      } else {
        console.log(err)
        res.status("400").send(err);
      }
    }
  );
};

module.exports.addDepartement = (req, res, next) => {
  console.log("addDeparement", req.body);
  User.findByIdAndUpdate(
    req.body.idUser,
    {
      $addToSet: {
        departements: {
          _id: req.body._id,
          departement: req.body.departement
        }
      }
    },
    { fullName: 1, _id: 1, status: 1, departements:1 },
    (err, doc) => {
      if (!err) {
        res.status("200").send("doc");
      } else {
        res.status("400").send(err);
      }
    }
  );
};

module.exports.rmDepartementUser=(req,res)=>{
   User.findByIdAndUpdate(req.params.idUser,{
     $pull: { departements: { _id: req.params.idDepartement } }} ,
     (err,doc)=>{
       if(!err){
        res.status("200").send("Delete success");
       }else{
         console.log(err)
       }
     }

     
   )
}
