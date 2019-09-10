const mongoose = require("mongoose");

const { ObjectId } = require("mongodb");
require("../models/dateMaintenance.model");
const DateMaintenance = mongoose.model("DateMaintenance");

module.exports.add = (req, res, next) => {
  console.log("add DateMaintenance");
  console.log(req.body.length);
  var datemaintenances = new Array();
  for (element in req.body) {
    var dateMaintenance = new DateMaintenance();
    
    dateMaintenance.StartTime = req.body[element].StartTime;
    dateMaintenance.EndTime = req.body[element].EndTime;
    console.log(typeof req.body[element].EndTime);
    dateMaintenance.idMaintenance = req.body[element].idMaintenance;
    dateMaintenance.codeBarre = req.body[element].codeBarre;
    datemaintenances.push(dateMaintenance);
  }
  console.log(datemaintenances);

  DateMaintenance.insertMany(datemaintenances,(err, doc) => {
    if (!err) res.send(doc);
    else {
      if (err.code === 1000) res.status(422).send(["erreur Date Maintenance"]);
      else return next(err);
    }
  });

  /* 
 
dateMaintenance.save((err, doc) => {
    if (!err) res.send(doc);
    else {
      if (err.code === 1000) res.status(422).send(["erreur Date Maintenance"]);
      else return next(err);
    }
  });*/
};

module.exports.delete = (req, res) => {
  console.log("occu delete");
  DateMaintenance.findByIdAndDelete(req.params.datemaintenance, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in Retriving Domaine: " + JSON.stringify(err, undefined, 2)
      );
    }
  });
};
module.exports.deleteSerie = (req, res) => {
  var id = ObjectId(req.params.idMaintenance);
  DateMaintenance.deleteMany(
    { idMaintenance: id, codeBarre: req.params.codeBarre },
    function(err, docs) {
      if (!err) {
        res.send(docs);
      } else {
        console.log(
          "Error in Retriving Domaine: " + JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
};

module.exports.getAll = (req, res) => {
  DateMaintenance.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "error in retriving DateMaintenances: " +
          JSON.stringify(err, undefined, 2)
      );
    }
  });
};

module.exports.getAllMaintDate = (req, res) => {
  DateMaintenance.aggregate(
    [
      {
        $lookup: {
          from: "maintenances",
          localField: "idMaintenance",
          foreignField: "_id",
          as: "resultat"
        }
      }, //{$sort:{'StartTime':1}},{$limit:10}], function (err, datemaintenances) {
      { $sort: { StartTime: 1 } }
    ],
    function(err, datemaintenances) {
      if (err) res.send(err);
      else {
      }
      res.json(datemaintenances);
    }
  );
};
