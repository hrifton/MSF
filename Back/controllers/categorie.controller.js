const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const { ObjectId } = require("mongodb");
require("../models/categorie.model");
const Categorie = mongoose.model("Categorie");
const Metier = mongoose.model("Metier");

module.exports.add = (req, res, next) => {
  var cat = new Categorie();
  cat.name = req.categorie;
  cat.color = req.color;
  cat.save((err, doc) => {
    if (!err) {
      Metier.findOneAndUpdate(
        { _id: req.idMetier },
        { $push: { idCategorie: doc } },
        (err, metier) => {
          if (!err) {
            res.send(doc);
          } else {
            console.log(err);
          }
        }
      );
      console.log(doc, "save dans metier", req.idMetier);
    } else {
      console.log(err);
    }
  });
};
