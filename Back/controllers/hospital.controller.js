const mongoose = require("mongoose");
require("../models/hospital.model");
mongoose.Promise - global.Promise;
const Hospital = mongoose.model("Hospital");

//GetAll Hospital
module.exports.getAll = (req, res) => {
  Hospital.find((err, docs) => {
    if (!err) {
      
      res.send(docs);
    } else {
      console.log("error Hospital:" + JSON.stringify(err, undefined, 2));
    }
  });
};
//Add hostpial
module.exports.add = (req, res, next) => {
  var hospital = new Hospital();
  (hospital.maintenance = req.body.maintenance),
    (hospital.country = req.body.country),
    (hospital.project = req.body.project),
    (hospital.startingDate = req.body.startingDate),
    (hospital.closuredate = req.body.closuredate),
    (hospital.ipdStructure = req.body.ipdStructure),
    (hospital.leveOfCare = req.body.leveOfCare);
  getNbHospitalByCountry(req.body.country)
    .then(function(response) {
      hospital.projectCode = hospital.country + response;
      hospital.save((err, doc) => {
        if (!err){        
          return res.send(doc);
        } 
        else {
          if (err.code === 11000) res.status(422).send(["Duplicate",err]);
          else return next(err);
        }
      });
    })
    .catch(function(error) {
      console.log(error);
    });
};


module.exports.findAHospital =(req,res)=>{
  Hospital.findById(req, (err, doc) => {
   if (!err) {
     res.send(doc);
   } else {
     console.log(
       "Error in Retriving Hopital:" + JSON.stringify(err, undefined, 2)
     );
   }
 }); 
}
function getNbHospitalByCountry(country) {
  return Hospital.countDocuments({ country: country });
}
