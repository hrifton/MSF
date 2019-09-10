const mongoose = require("mongoose");

require("../models/metier.model")

const Metier=mongoose.model("Metier");

module.exports.all=(req, res)=>{
    
    Metier.find((err,metier)=>{
        if(!err)res.send(metier);
        else console.log("Error In Retrivings: "+ JSON.stringify(err,undefined,2));
    })
}