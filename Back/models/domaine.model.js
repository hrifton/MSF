const mongoose = require("mongoose")

var domaineSchema=new mongoose.Schema({
    name:{type:String,required:true}
});

mongoose.model("Domaine",domaineSchema);