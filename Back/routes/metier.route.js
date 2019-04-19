const express = require("express");
const app = express();
const metierRoutes = express.Router();

let Metier = require("../models/Metier");

//route for get all metier
metierRoutes.route("/").get(function(req, res) {
  Metier.find(function(err, metiers) {
    if (err) {
      console.log(err);
    } else {
      res.json(metiers);
    }
  });
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
