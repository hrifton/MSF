const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

var dateMaintenanceSchema = new mongoose.Schema({
  StartTime: { type: Date, required: true },
  EndTime: { type: Date, required: true },
  description: { type: String, required: true },
  idMaintenance: { type: Object },
  codeBarre: { type: String },
  subCat: { type: String },
  categorie: { type: String },
  status: { type: String },
  idTech: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false
  },
  idHopital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hospital",
    required: true
  },
  solution: []
});

dateMaintenanceSchema.plugin(AutoIncrement, { inc_field: "slugD" });
mongoose.model("DateMaintenance", dateMaintenanceSchema);
//TODO  Construtor ??
