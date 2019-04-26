const express = require("express");

const maintenanceRoutes = express.Router();

const ctrlMaintenance = require("../controllers/maintenance.controller");

//Get All Maintenance
maintenanceRoutes.route("/").get(function(req, res) {
  ctrlMaintenance.all(req, res);
});

module.exports = maintenanceRoutes;
