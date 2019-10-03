const mongoose = require("mongoose");

require("../models/asset.model");
const Asset = mongoose.model("Asset");

require("../models/intervention.model");
const Intervention = mongoose.model("Intervention");

module.exports.byId = (req, res) => {};

module.exports.findInterByAsset = (req, res) => {
  console.log("asset Historique");
  Asset.aggregate(
    [
      { $match: { codeBarre: req.params.asset } },
      {
        $lookup: {
          from: "interventions",
          localField: "codeBarre",
          foreignField: "asset",
          as: "intervention"
        }
      },
      {
        $lookup: {
          from: "solutions",
          localField: "codeBarre",
          foreignField: "asset",
          as: "solutions"
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
  );
};
