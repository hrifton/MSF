const mongoose = require("mongoose");
require("../models/maintenance.model");
require("../models/hospital.model");
const { ObjectId } = require("mongodb");
const Hospital = mongoose.model("Hospital");
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
  console.log(req)
  let maintenance = new Maintenance(req);
    maintenance.save((err, doc) => {
      if (!err) res.send(doc);
      else {
        if (err.code === 1000)
          res.status(422).send(["erreur Date Maintenance"]);
        else return next(err);
      }
    });
};


