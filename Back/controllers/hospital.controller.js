const mongoose=require("mongoose");
require("../models/hospital.model");
const Hospital = mongoose.model("Hospital");

module.exports.add=(req,res,next)=>{
    var hospital = new Hospital();
    
}