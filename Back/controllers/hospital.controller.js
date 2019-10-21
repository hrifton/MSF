const mongoose = require("mongoose");
require("../models/hospital.model");
require("../models/metier.model");
const { ObjectId } = require("mongodb");
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

module.exports.findAHospital = (req, res) => {
  Hospital.find({ _id: ObjectId(req) }, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Error in Retriving Hopital:" + JSON.stringify(err, undefined, 2)
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

module.exports.addMetier = (req, res, next) => {
  Hospital.findByIdAndUpdate(
    req[0].idHopital,
    {
      $push: {
        metier: {
          id: req[0]._id,
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

module.exports.rmMetier = (req, res, next) => {
  Hospital.updateOne(
    { _id: ObjectId(req.idHopital), "metier.id": req.idMetier },
    (err, doc) => {
      if (!err) {
        res.status("200").send(doc);
      } else {
        //res.status("400").send(err);
        console.log(err);
      }
    }
  );
};

module.exports.addSubCat = (req, res, next) => {
  console.log(req)
  Hospital.updateOne(
    { _id: ObjectId(req[0].idHopital), "metier.id": req[0].idMetier },
    {
      $push: {
        "metier.$.categorie": {
          id: req[0]._id,
          name: req[0].name,
          color: req[0].color
        }
      }
    },
    (err, doc) => {
      if (!err) {
        console.log(doc);
      } else {
        console.log(err);
      }
    }
  );
};
function getNbHospitalByCountry(country) {
  return Hospital.countDocuments({ country: country });
}
