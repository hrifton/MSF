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
      console.log(req.idMetier, "**********0000doc: //////////", doc._id);
      Metier.findOneAndUpdate(
        req.idMetier,
        { $push: { idCategorie: doc } },
        (err, metier) => {
          if (!err) {
            metier.idCategorie.push(doc);
            res.send(metier);
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
