const mongoose = require("mongoose");

var interventionScheam = new mongoose.Schema({
  departement: { type: String },
  locality: { type: String },
  priority: { type: String },
  day: { type: String },
  description: { type: String },
  status: { type: String },
  type: { type: String },
  user: { type: String },
  tech: { type: String }
});

mongoose.model("Intervention", interventionScheam);
