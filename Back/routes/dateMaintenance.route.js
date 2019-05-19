const express = require("express");

const dateMaintenanceRoutes = express.Router();

const ctrlDateMaintenance = require("../controllers/dateMaintenance.controller");

//PostDateMaintenance
dateMaintenanceRoutes.route("/add").post((req, res, next) => {
  ctrlDateMaintenance.add(req, res, next);
});
//DeleteDateMaintenance
dateMaintenanceRoutes.route("/:datemaintenance").delete((req,res)=>{
ctrlDateMaintenance.delete(req,res);
});
 


//GetAllDateMaintenance
dateMaintenanceRoutes.route("/").get((req, res) => {
  ctrlDateMaintenance.getAll(req, res);
})

dateMaintenanceRoutes.route("/maintenancedate").get((req, res) => {
  ctrlDateMaintenance.getAllMaintDate(req, res);
})

module.exports = dateMaintenanceRoutes;
