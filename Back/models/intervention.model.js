const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

var interventionScheam = new mongoose.Schema({
  departement: { type: String },
  locality: { type: String },
  priority: { type: String },
  day: { type: String },
  description: { type: String },
  status: { type: String },
  type: { type: String },
  user: { type: String },
  tech: { type: String },
  metier: { type: String }
});
interventionScheam.plugin(AutoIncrement,{inc_field: 'slug'});
mongoose.model("Intervention", interventionScheam);
