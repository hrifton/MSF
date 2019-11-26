//File METIER IS CATEGORIE
//File CATEORIE IS SUBCATEGORIE

const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const { ObjectId } = require("mongodb");
require("../models/categorie.model");
const Categorie = mongoose.model("Categorie");
const Metier = mongoose.model("Metier");

module.exports.add = (req, res, next) => {
  console.log(req)
Metier.update(
  {_id:ObjectId(req.idCat)},
  { $addToSet: { categorie: { name: req.subCat } } },
  (err, data) => {
    if (!err) {
      res.status(200).send(data);
    } else {
      res.status(400).send(err);
    }
  }
);
};
module.exports.del = (req, res, next) => {
  console.log(req.idSubCat, req);
  Metier.updateOne(
    { _id: ObjectId(req.idCat) },
    { $pull: { categorie: { _id: ObjectId(req.idSubCat) } } },
    (errCatSub, doc) => {
      if (!errCatSub) {       
       res.status(200).send(doc);
      } else {
       res.status(400).send(errCatSub);
      }
    }
  );
};
