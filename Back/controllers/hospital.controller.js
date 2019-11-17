const mongoose = require("mongoose");
require("../models/hospital.model");
require("../models/metier.model");
require("../models/maintenance.model");
const { ObjectId } = require("mongodb");
mongoose.Promise - global.Promise;
const Hospital = mongoose.model("Hospital");
const Maintenance = mongoose.model("Maintenance");

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
        if (!err) {
          return res.send(doc);
        } else {
          if (err.code === 11000) res.status(422).send(["Duplicate", err]);
          else return next(err);
        }
      });
    })
    .catch(function(error) {
      console.log(error);
    });
};
//Find a hospital with ID
module.exports.findAHospital = (req, res) => {
  
  Hospital.find({ _id: ObjectId(req) }, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Error in Retriving Hopital ????:" + JSON.stringify(err, undefined, 2)
      );
    }
  });

  /*Hospital.findById(req, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Error in Retriving Hopital:" + JSON.stringify(err, undefined, 2)
      );
    }
  });
  
  
 */
};
//add metier to hospital
module.exports.addMetier = (req, res, next) => {
  Hospital.findByIdAndUpdate(
    req[0].idHopital,
    {
      $addToSet: {
        metier: {
          _id: req[0]._id,
          name: req[0].name,
          descriptif: req[0].descriptif,
          color: req[0].color
        }
      }
    },
    (err, doc) => {
      if (!err) {
        res.status("200").send(doc);
      } else {
        "Error in Retriving Hopital:" + JSON.stringify(err, undefined, 2);
      }
    }
  );
};
//remove metier to hospital
module.exports.rmMetier = (req, res, next) => {
  Hospital.updateOne(
    { _id: ObjectId(req.idHopital) },
    { $pull: { metier: { _id: req.idMetier } } },
    (err, doc) => {
      if (!err) {
        res.status("200").send(doc);
      } else {
        res.status("400").send(err);
      }
    }
  );
};
//remeve subCat to hostpital
module.exports.rmSubMetier = (req, res, next) => {
  console.log(req);
  Hospital.updateOne(
    { _id: ObjectId(req.idHopital), "metier._id": req.idMetier },
    { $pull: { "metier.$.categorie": { id: req._id } } },
    (err, doc) => {
      if (!err) {
        res.status("200").send(doc);
      } else {
        res.status("400").send(err);
      }
    }
  );
};
//add subCategorie
module.exports.addSubCat = (req, res, next) => {
  req._id == undefined ? (req._id = mongoose.Types.ObjectId()) : req._id;
  Hospital.findOneAndUpdate(
    { _id: ObjectId(req.idHopital), "metier._id": req.idMetier },
    {
      $addToSet: {
        "metier.$.categorie": {
          _id: req._id,
          name: req.name,
          color: req.color
        }
      }
    },
    (err, doc) => {
      if (!err) {
        res.status("200").send(doc);
      } else {
        res.status("400").send(err);
      }
    }
  );
};
//addDepartement to hosptiatl
module.exports.addDepToHop = (req, res, next) => {
  console.log(req);
  Hospital.updateOne(
    { _id: req[0].idHopital },
    {
      $addToSet: {
        departements: {
          _id: req[0]._id,
          departement: req[0].departement
        }
      }
    },
    (err, doc) => {
      if (!err) {
        res.status("200").send(doc);
      } else {
        res.status("400").send(err);
      }
    }
  );
};
//remove Departement to hospital
module.exports.delDepToHop = (req, res, next) => {
  console.log(req.idDepartement);
  Hospital.updateOne(
    { _id: req.idHopital },
    { $pull: { departements: { _id: req.idDepartement } } },
    (err, doc) => {
      if (!err) {
        res.status(200).send(doc);
      } else {
        res.status(400).send(err);
      }
    }
  );
};
module.exports.addMaintenance=(req,res,next)=>{
let maintenance=setMaintenance(req);
console.log(maintenance)
 Hospital.updateOne(
   { _id: ObjectId(req.idHospial) },
   { $addToSet: {  maintenance  } },
   (err, doc) => {
     if (!err) {
       res.status(200).send(doc);
     } else {
       res.status(400).send(err);
     }
   }
 );
}
//get Number  hospital in a country 
function getNbHospitalByCountry(country) {
  return Hospital.countDocuments({ country: country });
}
function setMaintenance(data){
let maintenance={
  _id:ObjectId(),
      name:data.name,
      StartTime:data.StartTime,
      categorie:data.categorie,
      choix:data.choix,
      codeBarre:data.codeBarre,
      count:data.count,
      current:data.current,
      date:data.date,
      day:data.day,
      dayOcc:data.dayOcc,
      description:data.description,
      end:data.end,
      interval:data.interval,
      listDay:data.listDay,
      month:data.month,
      periodicity:data.periodicity,
      recurrence:data.recurrence,
      subCat:data.subCat,
      until:data.until
    }
   return maintenance;
}

