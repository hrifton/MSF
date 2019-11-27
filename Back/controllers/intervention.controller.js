const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const { ObjectId } = require("mongodb");
require("../models/intervention.model");
const Intervention = mongoose.model("Intervention");
const User = mongoose.model("User");
var moment = require("moment");
/**
 * Recupere intervention du mois courant et les intervention avec le statut "Open" et Waiting
 * hors du mois courant
 */
module.exports.liste = (req, res) => {
  console.log("InterventionByHopital", req);
  var listOfMonth = [];
  Intervention.aggregate(
    [
      {
        $match: {
          $and: [
            { idHopital: ObjectId(req.idHopital) },
            {
              day: {
                $gte: new Date(req.startOfMonth),
                $lte: new Date(req.endOfMonth)
              }
            }
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
    (err, docs) => {
      if (!err) {
        listOfMonth.push(...docs);
        Intervention.aggregate(
          [
            {
              $match: {
                $and: [
                  { idHopital: ObjectId(req.idHopital) },
                  {
                    day: {
                      $lte: new Date(req.startOfMonth)
                      //$gte: new Date(req.endOfMonth)
                    }
                  },
                  { $or: [{ status: "Open" }, { status: "Waiting" }] }
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
          (err, docs2) => {
            if (!err) {
              listOfMonth.push(...docs2);
              res.status(200).send(listOfMonth);
            } else {
              console.log(
                "Error in Retriving Interventions:" +
                  JSON.stringify(err, undefined, 2)
              );
            }
          }
        );
      } else {
        console.log(
          "Error in Retriving Interventions:" +
            JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
};
/**
 * recupere la liste des intervention par User et par Departement de l'utilisateur
 */
module.exports.listeByUser = async (req, res) => {
  departement = new Intervention();

  departement = departement.parsing(req.idDepartement);
  console.log(departement);
  listIdDep = [];
  departement.forEach(element => {
    listIdDep.push(ObjectId(element._id));
  });
  console.log(listIdDep);

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
        console.log(doc.length);
        if (doc.length > 0) {
          res.status(200).send(doc);
        } else {
          res.status(200).send(false);
        }
      } else {
        console.log(err);
        res.status(400).send(err);
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
/**
 * recupere toute les interventions d'un tech
 */
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
/**
 * ajout d'une nouvelle Intervention
 */
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
/**mise a jour d'une intervention */
module.exports.update = (req, res, next) => {
  console.log("ctrlUpdate", req.body);
  var d = moment().format("L");

  Intervention.findByIdAndUpdate(
    req.body._id,
    {
      $set: {
        status: req.body.status,
        priority: req.body.priority,
        tech: req.body.tech,
        subCat: req.body.subCat,
        metier: req.body.metier,
        dateAssing: req.body.dateAssing
      }
    },
    (err, docs) => {
      // Handle any possible database errors
      if (err) {
        res.status(400).send(docs);
      }
      //return res.status(500).send(err);
      else {
        res.status(200).send(docs);
      } //res.send(intervention);
    }
  );
};

module.exports.addSolution = (req, res, next) => {
  var d = moment().format("L");
  console.log(req.body.solution);
  solution =
    req.body.status +
    "  " +
    d +
    "   :  " +
    req.body.solution +
    "  (" +
    req.body.tech +
    ")";
  Intervention.findByIdAndUpdate(
    req.body._id,
    {
      $addToSet: {
        solution: { solution }
      },
      $set: {
        status: req.body.status,
        priority: req.body.priority,
        tech: req.body.tech,
        subCat: req.body.subCat,
        metier: req.body.metier
      }
    },
    {},
    (err, data) => {
      if (!err) {
        res.status(200).send(data);
      } else {
        res.status(400).send(err);
      }
    }
  );
};
