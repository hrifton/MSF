//File METIER IS CATEGORIE
//File CATEORIE IS SUBCATEGORIE


const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const { ObjectId } = require("mongodb");
require("../models/categorie.model");
const Categorie = mongoose.model("Categorie");
const Metier = mongoose.model("Metier");

module.exports.add = (req, res, next) => {
  console.log("AssubCat ");
  var cat = new Categorie();
  cat.name = req.categorie;
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
      if (err.code == 11000) {
        console.log("doublon ajoute direct dans metier");
        Categorie.find({ name: req.categorie }, (err, doc) => {
          console.log("docs :::", doc);
          if (!err) {
            Metier.findOneAndUpdate(
              { _id: req.idMetier },
              { $addToSet: { categorie: doc } },
              (err, metier) => {
                if (!err) {
                  res.status("200").send(doc[0]);
                } else {
                  res.send(
                    "Error in Retriving Hopital:" +
                      JSON.stringify(err, undefined, 2)
                  );
                }
              }
            );
          } else {
            console.log("erro2", err);
          }
        });
      }
    }
  });
};
module.exports.del=(req,res,next)=>{
  Categorie.findByIdAndDelete({_id:req.idSubCat},(err,data)=>{
    if(!err){
      Metier.findOneAndUpdate({_id:req.idMetier},{$pull:{categorie:{_id:req.idSubCat}}},(errCatSub,doc)=>{
        if(!errCatSub){
          res.status(200).send(doc);
        }else{
          res.status(400).send(errCatSub);
        }
      })
      res.status(200).send(data)
    }else{res.status(400).send(err);}
  })
  
}