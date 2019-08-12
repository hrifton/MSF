const mongoose = require ("mongoose");

var hospitalSchema=new mongoose.Schema({
    idHospital:{type : ObjectId,required: true},
   country:{ type: String },
    city:{ type: String },
    zipCode:{ type: String },
    address:{ type: String },
    number:{ type: String }
});

mongoose.model("Hospital", hospitalSchema);

