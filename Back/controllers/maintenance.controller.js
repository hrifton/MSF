const mongoose = require("mongoose");
require("../models/maintenance.model");

const Maintenance = mongoose.model("Maintenance");

module.exports.all = (req, res, next) => {
  Maintenance.find((err, docs) => {
    if (!err) res.send(docs);
    else
      console.log("Error In Retrivings : " + JSON.stringify(err, undefined, 2));
  });
};
