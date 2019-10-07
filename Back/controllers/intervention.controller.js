const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const { ObjectId } = require("mongodb");
require("../models/intervention.model");
const Intervention = mongoose.model("Intervention");

module.exports.liste = (req, res) => {
  console.log(req.idHopital);
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
        $lookup: {
          from: "metiers",
          localField: "metier",
          foreignField: "_id",
          as: "metier"
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

module.exports.listeByUser = (req, res) => {
  var list = Array();

  Intervention.aggregate(
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
  );
};

module.exports.listeByTech = (req, res) => {
  Intervention.find({ tech: req }, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in Retriving Interventions:" + JSON.stringify(err, undefined, 2)
      );
    }
  }).sort({ field: "asc", _id: -1 });
};

module.exports.add = (req, res, next) => {
  var intervention = new Intervention(req.body);
  intervention.save((err, doc) => {
    if (!err) res.send(doc);
    else {
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
