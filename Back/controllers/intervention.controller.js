const mongoose = require("mongoose");

require("../models/intervention.model");
const Intervention = mongoose.model("Intervention");

module.exports.liste = (req, res) => {
  Intervention.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in Retriving Interventions:" + JSON.stringify(err, undefined, 2)
      );
    }
  }).sort({ field: "asc", _id: -1 });
};

module.exports.add = (req, res, next) => {
  var intervention = new Intervention();
  intervention.departement = req.body.departement;
  intervention.locality = req.body.locality;
  intervention.priority = req.body.priority;
  intervention.day = req.body.day;
  intervention.description = req.body.description;
  intervention.status = req.body.status;
  intervention.type = req.body.type;
  intervention.tech = req.body.tech;
  console.log("Save");
  intervention.save((err, doc) => {
    if (!err) res.send(doc);
    else {
      if (err.code === 11000) res.status(422).send(["erreur Intervention"]);
      else return next(err);
    }
  });
};
