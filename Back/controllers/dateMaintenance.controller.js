const mongoose = require("mongoose");

require("../models/dateMaintenance.model");
const DateMaintenance = mongoose.model("DateMaintenance");

module.exports.add = (req, res, next) => {
  var dateMaintenance = new DateMaintenance();
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

module.exports.delete = (req, res) => {

  DateMaintenance.findByIdAndDelete(req.params.datemaintenance, (err, doc) => {

    if (!err) return res.sendStatus(200);

    return res.sendStatus(500);
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

module.exports.getAllMaintDate = (req, res) => { 
  DateMaintenance.aggregate([{
    $lookup: {
      from: 'maintenances',
      localField: "idMaintenance",
      foreignField: "_id",
      as: "resultat"
    }
  },{$sort:{'StartTime':1}},{$limit:10}], function (err, datemaintenances) {
    if (err) res.send(err);
    else{}
    res.json(datemaintenances);
  });

}