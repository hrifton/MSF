const express = require("express");
const categorieRoutes = express.Router();
const ctrlCategorie = require("../controllers/categorie.controller");

categorieRoutes.route("/add").post(function(req, res, next) {
  ctrlCategorie.add(req.body, res, next);
});
module.exports = categorieRoutes;
