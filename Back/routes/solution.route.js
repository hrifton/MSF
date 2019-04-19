const express = require("express");
const soltionRoutes = express.Router();
const ctrlSolution = require("../controllers/solution.controller");

soltionRoutes.route("/add").post(function(req, res, next) {
  console.log("Soltuion Route");
  ctrlSolution.add(req, res, next);
});

module.exports = soltionRoutes;
