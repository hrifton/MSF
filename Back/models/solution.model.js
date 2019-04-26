const mongoose = require("mongoose");

var solutionSchema = new mongoose.Schema({
  idIntervention: { type: String },
  solution: { type: String },
  date: { type: String },
  asset: { type: String },
  mat: { type: String },
  idTech: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true }
});

mongoose.model("Solution", solutionSchema);
