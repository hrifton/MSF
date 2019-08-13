const mongoose = require("mongoose");
require("../models/hospital.model");
const Hospital = mongoose.model("Hospital");


//GetAll Hospital
module.exports.getAll=(req,res)=>{
  Hospital.find((err,docs)=>{
    if (!err) {
      res.send(docs);
    } else {
      console.log("error Hospital:" + JSON.stringify(err,undefined,2));
    }
  });
}
//Add hostpial
module.exports.add = (req, res, next) => {
   var hospital = new Hospital(req.body);
   
   hospital.save((err,doc)=>{
     if(!err) res.send(doc);
     else{
       if(err.code===1000)res.status(422).send(["erreur"]);
       else return next(err.code);
     }
   });
};
