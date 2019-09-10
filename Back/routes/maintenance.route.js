const express = require("express");

const maintenanceRoutes = express.Router();

const ctrlMaintenance = require("../controllers/maintenance.controller");

//Get All Maintenance
maintenanceRoutes.route("/").get(function(req,res) {
  ctrlMaintenance.all(req,res);
});


maintenanceRoutes.route("/add").post(function(req,res){
  console.log("route Maintenance add")
  ctrlMaintenance.add(req,res);
})

module.exports = maintenanceRoutes;
