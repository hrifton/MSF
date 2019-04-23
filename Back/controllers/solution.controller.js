const mongoose = require("mongoose");

require("../models/solution.model");

const Solution = mongoose.model("Solution");

module.exports.liste = (req, res) => {
  console.log("List");
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

  solution.idIntervention = req.body.idIntervention;
  solution.solution = req.body.solution;
  solution.date = req.body.date;
  solution.asset = req.body.asset;
  solution.mat = req.body.mat;

  solution.save((err, doc) => {
    if (!err) res.send(doc);
    else {
      console.log(err);
      if (err.code === 11000) res.status(422).send(["Duplicate email."]);
      else return next(err);
    }
  });
};

module.exports.listeByIntervention = (req, res, next) => {
  Solution.find({ idIntervention: req }, (err, docs) => {
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
