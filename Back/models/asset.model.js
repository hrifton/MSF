const mongoose = require("mongoose");

var assetSchema=new mongoose.Schema({
    name:{type:String, required:true},
    codeBarre:{type:String, required:true},
    serial_number:{type:String},
    domaine:{type:String},
    buphagus:{type:String},
    brand:{type:String},
    model:{type:String}
});

mongoose.model("Asset", assetSchema);