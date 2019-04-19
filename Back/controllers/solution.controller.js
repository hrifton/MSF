const mongoose = require("mongoose");

require("../models/solution.model");

const Solution = mongoose.model("Solution");

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
