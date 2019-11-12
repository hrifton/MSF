const express = require("express");
const userRoutes = express.Router();
const ctrlUser = require("../controllers/user.controller");
const jwtHelper = require("../config/jwtHelper");

userRoutes.post("/register", ctrlUser.register);
userRoutes.post("/authenticate", ctrlUser.authenticate);
userRoutes.get("/userProfil", jwtHelper.verifyJwtToken, ctrlUser.userProfile);
userRoutes.get("/techs", ctrlUser.getTech);
userRoutes.post("/addDepartement", ctrlUser.addDepartement);

userRoutes
  .route("/rmDepartementUser/:idUser/:idDepartement")
  .delete((req, res) => {
    ctrlUser.rmDepartementUser(req, res);
  });

userRoutes.route("/:id").get((req, res) => {
  ctrlUser.getUserMsal(req.query, res);
});

userRoutes.route("techsByHospital/:id").get((req, res) => {
  console.log(req);
  //ctrlUser.getTechByHopital(req.query, res);
});

//userRoutes.rdelete("/rmDepartementUser/:idUser/:id", ctrlUser.rmDepartement);

module.exports = userRoutes;
