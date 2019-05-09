const mongoose = require("mongoose");

require("../models/dateMaintenance.model");
const DateMaintenance = mongoose.model("DateMaintenance");

module.exports.add = (req, res, next) => {
  var dateMaintenance = new DateMaintenance();
console.log(req.body)
  dateMaintenance.StartTime = req.body.StartTime
  dateMaintenance.EndTime = req.body.EndTime
  dateMaintenance.idMaintenance = req.body.idMaintenance
 

  dateMaintenance.save((err, doc) => {
    if (!err) res.send(doc);
    else {
      if (err.code === 1000) res.status(422).send(["erreur Date Maintenance"]);
      else return next(err);
    }
  });
};
module.exports.getAll = (req, res) => {
  DateMaintenance.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("error in retriving DateMaintenances: " + JSON.stringify(err, undefined, 2));
    }
  })
}