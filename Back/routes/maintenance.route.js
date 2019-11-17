const express = require("express");

const maintenanceRoutes = express.Router();

const ctrlMaintenance = require("../controllers/maintenance.controller");

//Get All Maintenance
maintenanceRoutes.route("/maintenance").get(function(req, res) {
  ctrlMaintenance.all(req, res);
});

maintenanceRoutes.route("/add").post(function(req, res) {
  console.log("route Maintenance add");
  ctrlMaintenance.add(req.body, res);
});
maintenanceRoutes.route("/addForHospital").post(function(req, res) {
  ctrlMaintenance.addForHospital(req.body, res);
});

module.exports = maintenanceRoutes;
