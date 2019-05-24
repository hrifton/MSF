const mongoose = require("mongoose");

require ("../models/asset.model");
const Asset=mongoose.model("Asset");


require("../models/intervention.model");
const Intervention = mongoose.model("Intervention");

module.exports.byId=(req,res)=>{
    
}

module.exports.findInterByAsset=(req,res)=>{
    
    
    Asset.aggregate([{$match:{codeBarre: req.params.asset}},{$lookup: {
        from: "interventions",
        localField: "codeBarre",
        foreignField: "asset",
        as: "result"
      }}],(err, docs) => {
        if (!err) {
          res.send(docs);
        } else {
          console.log(
            "Error in Retriving Interventions:" + JSON.stringify(err, undefined, 2)
          );
        }
      });
   
}
