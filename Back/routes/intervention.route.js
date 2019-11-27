const express = require("express");
const interventionRoutes = express.Router();
const ctrlIntervention = require("../controllers/intervention.controller");

//GetToutesLesInterventionByHopital
interventionRoutes.route("/byHopital").get(function(req, res) {
  ctrlIntervention.liste(req.query, res);
});

//GetToutesLesInterventionByUser
interventionRoutes.route("/ByUser").get(function(req, res) {
  ctrlIntervention.listeByUser(req.query, res);
});

//GetToutesLesInterventionByTech
interventionRoutes.route("/ByTech").get(function(req, res) {
  ctrlIntervention.listeByTech(req.query.fullName, res);
});

//AddNewIntervention
interventionRoutes.route("/add").post(function(req, res, next) {
  ctrlIntervention.add(req, res, next);
});

//UpdateD'Intervention
interventionRoutes.route("/:_id").put(function(req, res, next) {
  ctrlIntervention.update(req, res, next);
});

//delete a intervention
interventionRoutes.route("/delete/:id").get(function(req, res) {
  Intervention.findByIdAndRemove(function(err, interventions) {
    if (err) res.json(err);
    else res.json("ok Delete");
  });
});
interventionRoutes.route("/solution/:_id").put(function(req, res, next) {
  ctrlIntervention.addSolution(req, res, next);
});

module.exports = interventionRoutes;
