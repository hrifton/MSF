const mongoose = require("mongoose");
require("../models/domaine.model");
const Domaine = mongoose.model("Domaine");

module.exports.all = (req, res) => {
    Domaine.find((err, docs) => {
        if (!err) {
            res.send(docs)
        }
        else {
            console.log(
                "Error in Retriving Domaine: " + JSON.stringify(err, undefined, 2)
            )
        }
    })

}