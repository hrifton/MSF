const mongoose = require("mongoose");

require("../models/solution.model");
require("../models/user.model");
const Solution = mongoose.model("Solution");
const User = mongoose.model("User");
var test;
module.exports.liste = (req, res) => {
  Solution.find((err, docs) => {
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
  var solution = new Solution();

  User.findOne({ fullName: req.body.idTech }, (err, res) => {
    this.test = res;
  });

  solution.idIntervention = req.body.idIntervention;
  solution.solution = req.body.solution;
  solution.date = req.body.date;
  solution.asset = req.body.asset;
  solution.mat = req.body.mat;
  solution.idTech = this.test.id;

  solution.save((err, doc) => {
    if (!err) {
      console.log("save ok");
      res.send(doc);
    } else {
      console.log(err);
      if (err.code === 11000) res.status(422).send(["error."]);
      else return next(err);
    }
  });
};

module.exports.listeByIntervention = (req, res, next) => {
  Solution.aggregate([{
    $lookup: {
      from: 'maintenances',
      localField: "idMaintenance",
      foreignField: "_id",
      as: "resultat"
    }
  }], (err, docs) => {
    if (!err) {
      console.log(docs);
      res.send(docs);
    } else {
      console.log(
        "Error in Soltion IdIntervention:" + JSON.stringify(err, undefined, 2)
      );
    }
  });
};
module.exports.solutionbyIntervention = (req, res) => {
  Solution.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in Retriving Interventions:" + JSON.stringify(err, undefined, 2)
      );
    }
  }).sort({ field: "asc", _id: -1 });
};