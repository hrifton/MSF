const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const { ObjectId } = require("mongodb");
require("../models/categorie.model");
const Categorie = mongoose.model("Categorie");
const Metier = mongoose.model("Metier");

module.exports.add = (req, res, next) => {
  console.log(req);
  var cat = new Categorie();
  cat.name = req.categorie;
  cat.color = req.color;
  cat.save((err, doc) => {
    if (!err) {
      Metier.findOneAndUpdate(
        { _id: req.idMetier },
        { $addToSet: { categorie: doc } },
        (err, metier) => {
          if (!err) {
            console.log(metier);
            //res.send(metier);
          } else {
            console.log("Error :", err);
            //res.send("Error in Retriving Hopital:" + JSON.stringify(err, undefined, 2));
          }
        }
      );
      res.send(doc);
    } else {
      if (err.code==11000) {
        console.log("doublon ajoute direct dans metier")
        Categorie.find({ name: req.categorie }, (err, doc) => {
          console.log("docs :::",doc);
          if (!err) {
            Metier.findOneAndUpdate(
              { _id: req.idMetier },
              { $addToSet: { categorie: doc } },
              (err, metier) => {
                if (!err) {
                  res.send(doc[0]);
                } else {
                  res.send("Error in Retriving Hopital:" + JSON.stringify(err, undefined, 2));
                }
              }
            );
          } else {
            console.log("erro2",err)
          }
        });
      }
    }
  });
};
