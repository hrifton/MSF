const mongoose = require("mongoose");
//appelle du fichier model
require("../models/departement.model");
//appelle du model dans mongoose
const Departement = mongoose.model("Departement");

module.exports.liste = (req, res) => {
  Departement.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in Retriving Departement:" + JSON.stringify(err, undefined, 2)
      );
    }
  }).sort({ field: "asc", _id: -1 });
};
