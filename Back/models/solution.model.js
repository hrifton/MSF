const mongoose = require("mongoose");

var solutionSchema = new mongoose.Schema({
  idIntervention: { type: String },
  solution: { type: String },
  date: { type: String },
  asset: { type: String },
  mat: { type: String }
});

mongoose.model("Solution", solutionSchema);
