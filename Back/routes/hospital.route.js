const express = require("express");
const hospitalRoutes = express.Router();
const ctrlHospital = require("../controllers/hospital.controller");

hospitalRoutes.route("/").get((req, res) => {
  ctrlHospital.getAll(req, res);
});

hospitalRoutes.route("/add").post(function(req, res, next) {
  console.log("route Hospital add");
  ctrlHospital.add(req, res, next);
});

//GetaHospital
hospitalRoutes.route("/id").get(function(req, res) {
  ctrlHospital.findAHospital(req.query.id,res);
});

module.exports = hospitalRoutes;
