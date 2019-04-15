const mongoose = require("mongoose");
const Intervention = mongoose.model("Intervention");

module.exports.register = (req, res, next) => {
  var intervention = new Intervention();
  intervention.departement = req.body.departement;
  intervention.locality = req.body.locality;
  intervention.priority = req.body.priority;
  intervention.day = req.body.day;
  intervention.description = req.body.description;
  intervention.status = req.body.status;
  intervention.type = req.body.type;
  intervention.tech = req.body.tech;

  intervention.save((err, doc) => {
    if (!err) res.send(doc);
    else {
      if (err.code === 1100) res.status(422).send(["Il y a u une erreur"]);
      else return next(err);
    }
  });
};
