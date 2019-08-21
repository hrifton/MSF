const mongoose = require("mongoose");

var hospitalSchema = new mongoose.Schema({
  projectCode: { type: 'String', unique: true, sparse: true, required: true },
  country: { type: String, required: true },
  project: { type: 'String', unique:true, required: true },
  startingDate: { type: String, required: true },
  closuredate: { type: String },
  ipdStructure: { type: String },
  leveOfCare: { type: String }
});

hospitalSchema.pre("save", function(next) {
  console.log("calling next!");
  // `return next();` will make sure the rest of this function doesn't run
  /*return*/ next();
  console.log("after next");
});

mongoose.model("Hospital", hospitalSchema);
