const mongoose = require("mongoose");

require("../models/solution.model");
require("../models/user.model");
require("../models/intervention.model");
const Solution = mongoose.model("Solution");
const User = mongoose.model("User");
const Intervention = mongoose.model("Intervention");
module.exports.liste = (req, res) => {
  Solution.find((err, docs) => {
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
  //Look if a solution with this idIntervention existe
  Solution.findOne({ idIntervention: req.idIntervention }, (err, sol) => {
    if (!err) {
      //if not found IdIntervention in solution create new solution
      if (sol == null) {
        //look id Tech tech
        User.findOne({ fullName: req.tech }, (err, user) => {
          if (!err) {
            var solution = new Solution();
            solution.solution = req.solution;
            solution.asset = req.asset;
            solution.mat = req.mat;
            solution.dateCloture = req.dateCloture;
            solution.dateAssign = req.dateAssign;
            solution.status = req.status;
            solution.idCategorie = req.idCategorie;
            solution.idTech = user._id;
            solution.idIntervention = req.idIntervention;
            solution.idDepartement = req.idDepartement;
            solution.idHopital = req.idHopital;
            solution.save((err, doc) => {
              if (!err) {
                //UpdateStatus of Intervention
                Intervention.findByIdAndUpdate(
                  doc.idIntervention,
                  { status: "Done" },
                  (errInter, Inter) => {
                    if (!errInter) {
                      console.log("intervention cloture ", Inter);
                    } else {
                      res.send(errInter);
                      console.log(errInter);
                    }
                  }
                );

                res.send(doc);
              } else {
                console.log(err);
                if (err.code === 11000) res.status(422).send(["error."]);
                else return err;
              }
            });
          } else {
            console.log("Solution deja existante Intervention Closed1");
            res.send("IdTechnicien incorrect");
          }
        });
      } else {
        console.log("Solution deja existante Intervention Closed1.2");
        res.send("Solution deja existante Intervention Closed");
      }
    } else {
      console.log("Solution deja existante Intervention Closed2");
      res.send("Solution deja existante Intervention Closed");
    }
  });
};
module.exports.addWaiting = (req, res, next) => {
  console.log("waiting");
  Solution.findOne({ idIntervention: req.idIntervention }, (err, sol) => {
    if (!err) {
      console.log("tourver :", sol == null, sol);
      if (sol == null) {
        //look id Tech tech
        User.findOne({ fullName: req.tech }, (err, res) => {
          if (!err) {
            req.idTech = res._id;
            //call function save solution
            var solution = new Solution();
            solution.solution = req.solution;
            solution.asset = req.asset;
            solution.mat = req.mat;
            solution.dateWaiting = req.dateWaiting;
            solution.dateAssign = req.dateAssign;
            solution.status = req.status;
            solution.idCategorie = req.idCategorie;
            solution.idIntervention = req.idIntervention;
            solution.idDepartement = req.idDepartement;
            solution.idHopital = req.idHopital;
            solution.idTech = res._id;

            solution.save((err, doc) => {
              if (!err) {
                console.log("ok save");

                Intervention.findByIdAndUpdate(
                  doc.idIntervention,
                  { status: "Waiting" },
                  (errInter, Inter) => {
                    if (!errInter) {
                      console.log("intervention Waiting ", Inter);
                    } else {
                      res.send(errInter);
                      console.log(errInter);
                    }
                  }
                );
              } else {
                console.log(err);
                if (err.code === 11000) res.status(422).send(["error."]);
                else res.send(err);
              }
            });
          } else {
            console.log("Solution deja existante Intervention Waiting1");
            res.send("IdTechnicien incorrect");
          }
        });
      } else if (sol != null) {
        Solution.findOneAndUpdate(
          { idIntervention: req.idIntervention },
          {
            $push: {
              dateWaiting: req.dateWaiting[0],
              solution: req.solution
            }
          },
          (errInter, Inter) => {
            if (!errInter) {
             res.send(Inter)
            } else {
              res.send(errInter);
              console.log(errInter);
            }
          }
        );
      }
    } else {
      console.log(err);
    }
  });
};

module.exports.listeByIntervention = (req, res, next) => {
  Solution.aggregate(
    [
      {
        $lookup: {
          from: "maintenances",
          localField: "idMaintenance",
          foreignField: "_id",
          as: "resultat"
        }
      }
    ],
    (err, docs) => {
      if (!err) {
        console.log(docs);
        res.send(docs);
      } else {
        console.log(
          "Error in Soltion IdIntervention:" + JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
};
module.exports.solutionbyIntervention = (req, res) => {
  console.log("update");
  Solution.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in Retriving Interventions:" + JSON.stringify(err, undefined, 2)
      );
    }
  }).sort({ field: "asc", _id: -1 });
};
