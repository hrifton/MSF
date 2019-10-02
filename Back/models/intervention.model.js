const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

var interventionScheam = new mongoose.Schema({
  domaine: { type: String },
  locality: { type: String },
  priority: { type: String },
  day: { type: String },
  description: { type: String },
  status: { type: String },
  type: { type: String },
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  tech: { type: String },
  metier: { type: String },
  idHopital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hopital",
    required: true
  },
  idDepartement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "departement",
    required: true
  },
  asset: { type: String }
});
interventionScheam.plugin(AutoIncrement, { inc_field: "slug" });
mongoose.model("Intervention", interventionScheam);
