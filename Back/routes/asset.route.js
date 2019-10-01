const express = require("express")
const assetRoutes=express.Router();
const ctrlAsset= require('../controllers/asset.controller')





assetRoutes.route("/add").post(function(req,res){
    console.log("add asset")
    console.log(req.body)
  })

assetRoutes.route("/inter/:asset").get((req,res)=>{

  ctrlAsset.findInterByAsset(req,res);
})


module.exports=assetRoutes;