const express = require("express");
const hospitalRoutes = express.Router();
const ctrlHospital = require("../controllers/hospital.controller");
const ctrlUser = require("../controllers/user.controller");

hospitalRoutes.route("/").get((req, res) => {
  ctrlHospital.getAll(req, res);
});

hospitalRoutes.route("/add").post(function(req, res, next) {
  console.log("route Hospital add");
  ctrlHospital.add(req, res, next);
});

//GetaHospital
hospitalRoutes.route("/id").get(function(req, res) {
  ctrlHospital.findAHospital(req.query.id, res);
});
hospitalRoutes.route("/addmetier").post(function(req, res, next) {
  ctrlHospital.addMetier(req.body, res, next);
});
hospitalRoutes
  .route("/delete/:idHopital/:idMetier")
  .delete(function(req, res, next) {
    ctrlHospital.rmMetier(req.params, res, next);
  });

hospitalRoutes.route("/addSubCat").post(function(req, res, next) {
  ctrlHospital.addSubCat(req.body, res, next);
});
//All User hospital
hospitalRoutes.route("/userbyhospital").get(function(req, res) {
  ctrlUser.FindUserByHospital(req.query, res);
});
hospitalRoutes.route("/addDep").post(function(req, res, next) {
  console.log(req.body);
  ctrlHospital.addDepToHop(req.body, res, next);
});

hospitalRoutes
  .route("/delDep/:idHopital/:idDepartement")
  .delete(function(req, res, next) {
    ctrlHospital.delDepToHop(req.params, res, next);
  });

//deleteDepartement;

module.exports = hospitalRoutes;
