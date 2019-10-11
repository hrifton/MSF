const express = require("express");
const solutionRoutes = express.Router();
const ctrlSolution = require("../controllers/solution.controller");

solutionRoutes.route("/add").post(function(req, res, next) {
  console.log("Soltuion Route");
  ctrlSolution.add(req, res, next);
});
solutionRoutes.route("/").get(function(req, res) {
  console.log("all Solition");
  ctrlSolution.liste(req, res);
});

solutionRoutes.route("/ByIntervention/:idAsset").get(function(req, res) {
  console.log(req.params.idAsset)
  ctrlSolution.listeByIntervention(req.query.idIntervention, res);
  //ctrlSolution.listeByIntervention(req.query.fullName, res);
});
solutionRoutes.route("/solutionByIntervention").get(function(req, res) {
  
  ctrlSolution.listeByIntervention(req, res);
  //ctrlSolution.listeByIntervention(req.query.fullName, res);
});

module.exports = solutionRoutes;
