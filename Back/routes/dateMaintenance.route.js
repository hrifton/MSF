const express = require("express");

const dateMaintenanceRoutes = express.Router();

const ctrlDateMaintenance = require("../controllers/dateMaintenance.controller");

//PostDateMaintenance
dateMaintenanceRoutes.route("/add").post((req, res, next) => {
  ctrlDateMaintenance.add(req, res, next);
});
//DeleteDateMaintenance
dateMaintenanceRoutes.route("/:datemaintenance").delete((req, res) => {
  console.log("occu delete");
  ctrlDateMaintenance.delete(req, res);
});
//Delete Serie Interventions
dateMaintenanceRoutes
  .route("/delete/:idMaintenance/:codeBarre")
  .delete((req, res) => {
    ctrlDateMaintenance.deleteSerie(req, res);
  });

//GetAllDateMaintenance
dateMaintenanceRoutes.route("/byHopital").get((req, res) => {
  ctrlDateMaintenance.getDateMainteToHopital(req.query, res);
});

dateMaintenanceRoutes.route("/maintenancedate").get((req, res) => {
  console.log("dateMiantenance");
  ctrlDateMaintenance.getAllMaintDate(req, res);
});

dateMaintenanceRoutes.route("/getDateMaintenanceByTech").get((req, res) => {
  ctrlDateMaintenance.getDateMaintenanceByTech(req.query, res);
});

dateMaintenanceRoutes.route("/MaintenanceByHospitalAndDate").get((req, res) => {
  ctrlDateMaintenance.getMaintenanceByHospitalAndDate(req.query, res);
});

dateMaintenanceRoutes.route("/addsolution/:id").put((req, res) => {
  ctrlDateMaintenance.addSolution(req.body, res);
});

dateMaintenanceRoutes.route("/updatedatemaintenance/:id").put((req, res) => {
  ctrlDateMaintenance.updatedatemaintenance(req.body, res);
});

module.exports = dateMaintenanceRoutes;
