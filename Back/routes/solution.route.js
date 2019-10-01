const express = require("express");
const soltionRoutes = express.Router();
const ctrlSolution = require("../controllers/solution.controller");

soltionRoutes.route("/add").post(function(req, res, next) {
  console.log("Soltuion Route");
  ctrlSolution.add(req, res, next);
});
soltionRoutes.route("/").get(function(req, res) {
  console.log("all Solition");
  ctrlSolution.liste(req, res);
});

soltionRoutes.route("/ByIntervention/:idAsset").get(function(req, res) {
  console.log(req.params.idAsset)
  ctrlSolution.listeByIntervention(req.query.idIntervention, res);
  //ctrlSolution.listeByIntervention(req.query.fullName, res);
});
soltionRoutes.route("/solutionByIntervention").get(function(req, res) {
  
  ctrlSolution.listeByIntervention(req, res);
  //ctrlSolution.listeByIntervention(req.query.fullName, res);
});

module.exports = soltionRoutes;
