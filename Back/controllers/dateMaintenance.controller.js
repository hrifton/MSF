const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
require("../models/dateMaintenance.model");
const DateMaintenance = mongoose.model("DateMaintenance");

module.exports.add = (req, res, next) => {
  console.log("add DateMaintenance");

  console.log(req.body);
  var datemaintenances = new Array();
  for (element in req.body) {
    var dateMaintenance = new DateMaintenance();

    dateMaintenance.StartTime = req.body[element].StartTime;
    dateMaintenance.EndTime = req.body[element].EndTime;
    dateMaintenance.description = req.body[element].description;
    dateMaintenance.idMaintenance = ObjectId(req.body[element].idMaintenance);
    dateMaintenance.idHopital = req.body[element].idHopital;
    dateMaintenance.subCat = req.body[element].subCat;
    dateMaintenance.categorie = req.body[element].categorie;
    dateMaintenance.codeBarre = req.body[element].codeBarre;
    dateMaintenance.status = req.body[element].status;
    dateMaintenance.idTech = req.body[element].idTech;
    datemaintenances.push(dateMaintenance);
  }
  console.log(datemaintenances);

  DateMaintenance.insertMany(datemaintenances, (err, doc) => {
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
module.exports.getDateMainteToHopital = (req, res) => {
  DateMaintenance.find({ idHopital: req.idHopital }, (err, data) => {
    if (!err) {
      res.status(200).send(data);
    } else {
      res.status(400).send(err);
    }
  });
};

module.exports.getDateMaintenanceByTech = (req, res) => {
  DateMaintenance.find({ idTech: req.idTech }, (err, data) => {
    if (!err) {
      res.status(200).send(data);
    } else {
      res.status(400).send(err);
    }
  });
};
module.exports.getMaintenanceByHospitalAndDate = (req, res) => {
  console.log(req)
 DateMaintenance.aggregate(
   [
     {
       $match: {
         $and: [
           { idHopital: req.idHopital },
           {
             StartTime: {
               $gte: new Date(req.startOfMonth),
               $lte: new Date(req.endOfMonth)
             }
           }
         ]
       }
     },
     { $sort: { StartTime: 1 } }
   ],
   function(err, datemaintenances) {
     if (err) res.send(err);
     else {
     }
     res.json(datemaintenances);
   }
 );

/*
  DateMaintenance.find(
    { idHopital: req.idHopital ,
      StartTime: {
        $gte: new Date(req.startOfMonth),
        $lte: new Date(req.endOfMonth)
      }
    },
    (err, data) => {
      if (!err) {
        res.status(200).send(data);
      } else {
        res.status(400).send(err);
      }
    }
  );*/
};
