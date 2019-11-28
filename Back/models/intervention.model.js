const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

var interventionScheam = new mongoose.Schema({
  domaine: { type: String },
  locality: { type: String },
  priority: { type: String },
  day: { type: Date },
  dateAssing: { type: Date },
  description: { type: String },
  status: { type: String },
  type: { type: String },
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  idTech: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false
  },
  metier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "metier",
    required: false
  },
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
  subCat: { type: String },
  asset: { type: String },
  solution: []
});

//converte String to Array[Objet]
interventionScheam.methods.parsing = function(json) {
  var newJson = json.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
  newJson = newJson.replace(/'/g, '"');
  return JSON.parse(newJson);
};

interventionScheam.plugin(AutoIncrement, { inc_field: "slugI" });
mongoose.model("Intervention", interventionScheam);
