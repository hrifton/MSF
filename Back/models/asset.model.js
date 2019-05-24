const mongoose = require("mongoose");

var assetSchema=new mongoose.Schema({
    name:{type:String, required:true},
    codeBarre:{type:String, required:true},
});

mongoose.model("Asset", assetSchema);