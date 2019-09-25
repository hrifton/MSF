const mongoose = require("mongoose");

require("../models/metier.model")

const Metier=mongoose.model("Metier");

module.exports.all=(req, res)=>{
    
    Metier.find((err,metier)=>{
        if(!err)res.send(metier);
        else console.log("Error In Retrivings: "+ JSON.stringify(err,undefined,2));
    })
};
module.exports.add=(req,res,next)=>{
var metier = new Metier(req.metier);
metier.save((err,doc)=>{
    if(!err){
        return doc
    }else{
        if(err.code ===11000) res.status(422).send(['error.']);
        else return next(err)
    }
})
   
}