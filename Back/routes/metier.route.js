const express = require("express");
const metierRoutes = express.Router();
const ctrlMetier = require("../controllers/metier.controller");

/**
 * route for get all metier
 */

metierRoutes.route("/metier").get(function(req, res) {
  ctrlMetier.all(req, res);
});

/**route for add a metier
 *
 */
metierRoutes.route("/add").post(function(req, res, next) {
  ctrlMetier.add(req.body, res, next);
});
/**
 * route for update
 */
metierRoutes.route("/update/:id").put(function(req, res) {
  Metier.findByIdAndUpdate(
    req.body.id,
    req.body,
    { new: true },
    (err, metier) => {
      if (err) return res.status(500).send(err);

      return res.send(metier);
    }
  );
});
/**
 * route for get by id
 */
metierRoutes.route("/:_id").get(function(req, res) {
  ctrlMetier.getById(req.params, res);
});

metierRoutes.route('/delete/:_id').delete(function(req,res){
   ctrlMetier.DeleteById(req.params, res);
})
module.exports = metierRoutes;
