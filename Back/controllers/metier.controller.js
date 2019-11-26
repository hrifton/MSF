const mongoose = require("mongoose");

require("../models/metier.model");

const Metier = mongoose.model("Metier");

module.exports.all = (req, res) => {
  Metier.find((err, metier) => {
    if (!err) {
      res.send(metier);
    } else
      res.send("Error In Retrivings: " + JSON.stringify(err, undefined, 2));
  });
};
module.exports.add = (req, res, next) => {
  var metier = new Metier(req.metier);
  metier.save((err, doc) => {
    if (!err) res.send(doc);
    else {
      if (err.code === 11000) res.status(422).send(["erreur Intervention"]);
      else return next(err);
    }
  });
};
module.exports.getById = (req, res) => {
  Metier.findById({ _id: req._id }, (err, doc) => {
    if (!err) res.send(doc.categorie);
    else console.log(err);
  });
};
module.exports.DeleteById = (req, res) => {
  Metier.findByIdAndDelete(req, (err, data) => {
    if (!err) {
      res.status(200).send(data);
    } else {
      res.status(400).send(err);
    }
  });
};
