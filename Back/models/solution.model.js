const mongoose = require("mongoose");

var solutionSchema = new mongoose.Schema({
  idIntervention: {type: mongoose.Schema.Types.ObjectId,ref: "Interventions",required: true},
  solution: [{ type: String }],
  dateAssign: { type: String },
  dateCloture:{type:String},
  dateWaiting:[{type:String}],
  asset: { type: String },
  mat: { type: String },
  idHopital:{type: mongoose.Schema.Types.ObjectId, ref: "Hospitals",required: true},
  idTech: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true }
});

mongoose.model("Solution", solutionSchema);
