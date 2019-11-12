const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const { ObjectId } = require("mongodb");
require("../models/intervention.model");
const Intervention = mongoose.model("Intervention");
const User = mongoose.model("User");

module.exports.liste = (req, res) => {
  console.log("InterventionByHopital", req);
  Intervention.aggregate(
    [
      { $match: { idHopital: ObjectId(req.idHopital) } },
      {
        $lookup: {
          from: "users",
          localField: "idUser",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $lookup: {
          from: "departements",
          localField: "idDepartement",
          foreignField: "_id",
          as: "departements"
        }
      },
      {
        $project: {
          "user.password": 0,
          "user.saltSecret": 0
        }
      }
    ],
    (err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        console.log(
          "Error in Retriving Interventions:" +
            JSON.stringify(err, undefined, 2)
        );
      }
    }
  ).sort({ field: "asc", _id: -1 });
};

module.exports.listeByUser = async (req, res) => {
  departement = new Intervention();
  departement = departement.parsing(req.idDepartement);
  listIdDep = [];
  departement.forEach(element => {
    listIdDep.push(ObjectId(element._id));
  });

  Intervention.aggregate(
    [
      {
        $match: {
          $and: [
            {
              idDepartement: {
                $in: listIdDep
              }
            },
            { idHopital: ObjectId(req.idHopital) }
          ]
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "idUser",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $lookup: {
          from: "departements",
          localField: "idDepartement",
          foreignField: "_id",
          as: "departements"
        }
      },
      {
        $project: {
          "user.password": 0,
          "user.saltSecret": 0
        }
      }
    ],
    (err, doc) => {
      if (!err) {
        
        if(doc.length>0){
          res.status(200).send(doc);
        }else{
          res.status(200).send(null)
        }
        
        
      } else {
      }
    }
  );

  /* Intervention.aggregate(
    [
      { $match: { idUser: ObjectId(req.idUser) } },
      {
        $lookup: {
          from: "users",
          localField: "idUser",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $lookup: {
          from: "departements",
          localField: "idDepartement",
          foreignField: "_id",
          as: "departements"
        }
      },
      {
        $project: {
          "user.password": 0,
          "user.saltSecret": 0
        }
      }
    ],
    (err, lisByUs) => {
      if (!err) {
        if (lisByUs.length > 0) {
          list = lisByUs;
          Intervention.aggregate(
            [
              {
                $match: {
                  idHopital: ObjectId(req.idHopital),
                  idDepartement: ObjectId(req.idDepartement),
                  idUser: { $ne: ObjectId(req.idUser) }
                }
              },
              {
                $lookup: {
                  from: "users",
                  localField: "idUser",
                  foreignField: "_id",
                  as: "user"
                }
              },
              {
                $lookup: {
                  from: "departements",
                  localField: "idDepartement",
                  foreignField: "_id",
                  as: "departements"
                }
              }
            ],
            (err, docs) => {
              if (!err) {
                res.send(list.concat(docs));
              }
            }
          );
        } else {
          Intervention.aggregate(
            [
              {
                $match: {
                  idHopital: ObjectId(req.idHopital),
                  idDepartement: ObjectId(req.idDepartement),
                  idUser: { $ne: ObjectId(req.idUser) }
                }
              },
              {
                $lookup: {
                  from: "users",
                  localField: "idUser",
                  foreignField: "_id",
                  as: "user"
                }
              },
              {
                $lookup: {
                  from: "departements",
                  localField: "idDepartement",
                  foreignField: "_id",
                  as: "departements"
                }
              }
            ],
            (err, docs) => {
              if (!err) {
                res.send(docs);
              }
            }
          );
        }

        //res.send(lisByUs);
      } else {
        console.log("if listByUs Empty");
        Intervention.aggregate(
          [
            {
              $match: {
                idHopital: ObjectId(req.idHopital),
                idDepartement: ObjectId(req.idDepartement),
                idUser: { $ne: ObjectId(req.idUser) }
              }
            },
            {
              $lookup: {
                from: "users",
                localField: "idUser",
                foreignField: "_id",
                as: "user"
              }
            },
            {
              $lookup: {
                from: "departements",
                localField: "idDepartement",
                foreignField: "_id",
                as: "departements"
              }
            }
          ],
          (err, docs) => {
            if (!err) {
              res.send(docs);
            } else {
              console.log(
                "Error in Retriving Interventions:" +
                  JSON.stringify(err, undefined, 2)
              );
            }
          }
        );
      }
    }
  );*/
};

module.exports.listeByTech = (req, res) => {
  Intervention.aggregate(
    [
      { $match: { tech: req } },
      {
        $lookup: {
          from: "metiers",
          localField: "metier",
          foreignField: "_id",
          as: "metier"
        }
      },
      {
        $lookup: {
          from: "departements",
          localField: "idDepartement",
          foreignField: "_id",
          as: "departements"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "idUser",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $project: {
          "user.password": 0,
          "user.saltSecret": 0
        }
      }
    ],
    (err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        console.log(
          "Error in Retriving Interventions:" +
            JSON.stringify(err, undefined, 2)
        );
      }
    }
  ).sort({ field: "asc", _id: -1 });
};

module.exports.add = (req, res, next) => {
  console.log(req.body);
  var intervention = new Intervention(req.body);
  intervention.save((err, doc) => {
    if (!err) {
      res.status(200).send(doc);
    } else {
      if (err.code === 11000) res.status(422).send(["erreur Intervention"]);
      else return next(err);
    }
  });
};

module.exports.update = (req, res, next) => {
  console.log("ctrlUpdate", req.body);

  Intervention.findByIdAndUpdate(req.body._id, req.body, (err, docs) => {
    // Handle any possible database errors
    if (err) {
      console.log(err);
    }
    //return res.status(500).send(err);
    else {
      console.log("update ok ");
      res.send(docs);
    } //res.send(intervention);
  });
};
