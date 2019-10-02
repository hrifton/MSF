const mongoose = require("mongoose");
require("../models/maintenance.model");
const { ObjectId } = require("mongodb");

const Maintenance = mongoose.model("Maintenance");

module.exports.all = (req, res) => {
  Maintenance.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in Retriving Maintenance:" + JSON.stringify(err, undefined, 2)
      );
    }
  }).sort({ field: "asc", _id: -1 });
};

module.exports.add = (req, res) => {
  let maintenance = new Maintenance();
  (maintenance.description = req.body.description),
    (maintenance.duration = req.body.duration),
    (maintenance.executor = req.body.executor),
    (maintenance.interval = req.body.interval),
    (maintenance.maintenance = req.body.maintenance),
    (maintenance.periodicity = req.body.periodicity),
    maintenance.save((err, doc) => {
      if (!err) res.send(doc);
      else {
        if (err.code === 1000)
          res.status(422).send(["erreur Date Maintenance"]);
        else return next(err);
      }
    });
};
