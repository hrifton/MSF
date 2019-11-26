const mongoose = require("mongoose");
const User = mongoose.model("User");
require("../models/hospital.model");
const Hospital = mongoose.model("Hospital");
const passport = require("passport");
const { ObjectId } = require("mongodb");
const _ = require("lodash");

module.exports.register = (req, res, next) => {
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
  User.find({ status: "Tech" }, { fullName: 1, _id: 1 }, (err, techs) => {
    if (!err) {
      res.send(techs);
    } else {
      console.log(
        "Error in Retriving Technicien : " + JSON.stringify(err, undefined, 2)
      );
    }
  });
};
module.exports.getTechByHopital = (req, res, next) => {
 
  User.find(
    { status: "Tech", idHopital: ObjectId(req.idHopital) },{ fullName: 1, _id: 1, status: 1, departements: 1 },
    (err, techs) => {
      if (!err) {
        res.status(200).send(techs);
      } else {
        res.status(404).send(err);
      }
    }
  );
};
module.exports.getAdminByHopital=(req,res,next)=>{
  User.find(
    { status: "Admin", idHopital: ObjectId(req.data) },
    { fullName: 1, _id: 1, status: 1, email:1 },
    (err, admin) => {
      if (!err) {
        res.status(200).send(admin);
      } else {
        res.status(404).send(err);
      }
    }
  );
}

module.exports.FindUserByHospital = (req, res) => {
  User.find(
    { idHopital: ObjectId(req.id) },
    { fullName: 1, _id: 1, status: 1, departements: 1 },
    (err, users) => {
      if (!err) {
        
        res.status(200).send(users);
      } else {
        console.log(err);
        res.status(400).send(err);
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
    { fullName: 1, _id: 1, status: 1, departements: 1 },
    (err, doc) => {
      if (!err) {
        res.status("200").send(doc);
      } else {
        res.status("400").send(err);
      }
    }
  );
};

module.exports.rmDepartementUser = (req, res) => {
  User.findByIdAndUpdate(
    req.params.idUser,
    {
      $pull: { departements: { _id: req.params.idDepartement } }
    },
    (err, doc) => {
      if (!err) {
        res.status("200").send("Delete success");
      } else {
        console.log(err);
      }
    }
  );
};
module.exports.getUserMsal = (req, res) => {
  User.find(
    { idMicrosoft: req._id },
    { fullName: 1, _id: 1, status: 1, departements: 1, idHopital: 1, email: 1 },
    (err, doc) => {
      if (!err) {
        //If first Connexion With compte MSF
        if (doc.length == 0) {
          //Verifier L'hopital
          var user = new User();
          let hopital = user.extractHopital(req.email);
          Hospital.find({ project: hopital }, (errHop, hop) => {
            //ifHospital find
            if (!errHop) {
              user.fullName = req.fullName;
              user.idMicrosoft = req._id;
              user.email = req.email;
              user.idHopital = ObjectId(hop[0]._id);
              user.status = "User";
              //Save MSF Account
              user.save((errsave, usave) => {
                if (!errsave) {
                  console.log("Usave ", usave, "$$$$$$$$$$$$$$$$");
                  res.status(200).send(usave);
                } else {
                  console.log("ici");
                  res.status(400).send(errsave);
                }
              });
            }
            //else NotFind
            else {
              console.log("Erro if 0", errHop);
            }
          });

          //else account MSF exist
        } else {
          res.status(200).send(doc[0]);
        }
      } else {
        var user = new User();
        user.NewUser(req);
        console.log(" error ");
      }
    }
  );
};
module.exports.ModifieRole=(req,res)=>{
  User.findByIdAndUpdate(
    req._id,
    {status:req.role    },
    { fullName: 1, _id: 1, status: 1},
    (err, doc) => {
      if (!err) {
        res.status("200").send(doc);
      } else {
        res.status("400").send(err);
      }
    }
  );
}

