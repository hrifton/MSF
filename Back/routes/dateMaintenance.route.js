const express = require("express");

const dateMaintenanceRoutes = express.Router();

const ctrlDateMaintenance = require("../controllers/dateMaintenance.controller");

//PostDateMaintenance
dateMaintenanceRoutes.route("/add").post((req, res, next) => {
  console.log("dateMaintenanceRoute Add");
  ctrlDateMaintenance.add(req, res, next);
});


//GetAllDateMaintenance
dateMaintenanceRoutes.route("/").get((req, res) => {
  ctrlDateMaintenance.getAll(req, res);
})

module.exports = dateMaintenanceRoutes;
