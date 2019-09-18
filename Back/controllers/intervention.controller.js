require("../models/intervention.model");
const mongoose = require("mongoose");
const Intervention = mongoose.model("Intervention");

module.exports.liste = (req, res) => {
  Intervention.aggregate(
    [
      {
        $lookup: {
          from: "solutions",
          localField: "_id",
          foreignField: "idIntervention",
          as: "solution"
        }
      }
    ],
    (err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        console.log(
          "Error in Retriving Interventions:" +
            JSON.stringify(err, undefined, 2)
        );
      }
    }
  ).sort({ field: "asc", _id: -1 });
};

module.exports.listeByUser = (req, res) => {
  Intervention.find({ user: req }, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in Retriving Interventions:" + JSON.stringify(err, undefined, 2)
      );
    }
  }).sort({ field: "asc", _id: -1 });
};

module.exports.listeByTech = (req, res) => {
  Intervention.find({ tech: req }, (err, docs) => {
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
  var intervention = new Intervention(req.body);
  intervention.save((err, doc) => {
    if (!err) res.send(doc);
    else {
      if (err.code === 11000) res.status(422).send(["erreur Intervention"]);
      else return next(err);
    }
  });
};

module.exports.update = (req, res, next) => {
  console.log("ctrlUpdate");
  console.log(req.body);
  Intervention.findByIdAndUpdate(
    req.body.id,
    req.body,
    (err, intervention) => {
      // Handle any possible database errors
      if (err) console.log(err);
      //return res.status(500).send(err);
      else {
        
        return intervention; //res.send(intervention);
    }
      }
  );
};
