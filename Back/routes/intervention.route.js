const express = require("express");

const interventionRoutes = express.Router();
const ctrlIntervention = require("../controllers/intervention.controller");
 //GetToutesLesIntervention
   interventionRoutes.route("/").get(function(req, res) {
     ctrlIntervention.liste(req, res);
   }); 

//GetToutesLesInterventionByUser
interventionRoutes.route("/ByUser").get(function(req, res) {
  ctrlIntervention.listeByUser(req.query.fullName, res);
});

//GetToutesLesInterventionByUser 
interventionRoutes.route("/ByTech").get(function(req, res) {
  ctrlIntervention.listeByTech(req.query.fullName, res);
});

//AddNewIntervention
interventionRoutes.route("/add").post(function(req, res, next) {
  ctrlIntervention.add(req, res, next);
});

//UpdateD'Intervention
interventionRoutes.route("/:id").put(function(req, res, next) {
  ctrlIntervention.update(req, res, next);
});

//delete a intervention
interventionRoutes.route("/delete/:id").get(function(req, res) {
  Intervention.findByIdAndRemove(function(err, interventions) {
    if (err) res.json(err);
    else res.json("ok Delete");
  });
});

module.exports = interventionRoutes;
