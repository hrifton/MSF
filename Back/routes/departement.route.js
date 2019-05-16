const express = require("express");
const app = express();
const departementRoutes = express.Router();
const ctrlDepartement = require("../controllers/departement.controller");
//let Departement = require("../models/Departement");

//getToutLesDepartement
departementRoutes.route("/").get(function(req, res) {
  ctrlDepartement.liste(req, res);

  /*Departement.find(function(err, departements) {
    console.log("dans le serveur");
    if (err) {
      console.log(err);
    } else {
      res.json(departements);
    } 
  });*/
});
//returne un departementDefini
departementRoutes.route("/edit/:departement").get(function(req, res) {
  Departement.findOne({ departement: req.params.departement }, function(
    err,
    departement
  ) {
    return err;
  });
});

//AjouterNewDepartement
departementRoutes.route("/add").post(function(req, res) {
  let departement = new Departement(req.body);

  departement
    .save()
    .then(departement => {
      res.status(200).json({ departement });
    })
    .catch(err => {
      res.status(400).send("il y a une erreur de DB");
    });
});

module.exports = departementRoutes;