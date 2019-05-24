const express = require("express")
const assetRoutes=express.Router();
const ctrlAsset= require('../controllers/asset.controller')





assetRoutes.route("/add").post(function(req,res){
    
    const papa = require('papaparse');
    const readFileSync = require('fs');
    
    const file = readFileSync(req.body, 'utf8');
    papa(file, {complete: (result) => console.dir(result.data)});
    console.log(req.body)
  })

assetRoutes.route("/inter/:asset").get((req,res)=>{
  ctrlAsset.findInterByAsset(req,res);
})



module.exports=assetRoutes;