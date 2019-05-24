const express = require("express");
const metierRoutes = express.Router();
const ctrlMetier= require('../controllers/metier.controller');


//route for get all metier
metierRoutes.route("/").get(function(req, res) {
  ctrlMetier.all(req, res);
});
//route for add a metier
metierRoutes.route("/add").post(function(req, res) {
  let metier = new Metier(req.body);

  metier
    .save()
    .then(metier => {
      res.status(200).json({ metier });
    })
    .catch(err => {
      res.status(400).send("erreur DB");
    });
});
//route for update
metierRoutes.route("/update/:id").put(function(req, res) {
  Metier.findByIdAndUpdate(
    req.body.id,
    req.body,
    { new: true },
    (err, metier) => {
      if (err) return res.status(500).send(err);

      return res.send(metier);
    }
  );
});
module.exports = metierRoutes;
