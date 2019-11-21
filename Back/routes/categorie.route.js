const express = require("express");
const categorieRoutes = express.Router();
const ctrlCategorie = require("../controllers/categorie.controller");

categorieRoutes.route("/add").post(function(req, res, next) {
  ctrlCategorie.add(req.body, res, next);
});
categorieRoutes.route("/del").delete(function(req, res, next) {
  ctrlCategorie.del(req.query, res, next);
                                                              });
module.exports = categorieRoutes;
