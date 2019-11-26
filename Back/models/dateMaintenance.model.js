const mongoose = require("mongoose");

var dateMaintenanceSchema = new mongoose.Schema({
  StartTime: { type: Date, required: true },
  EndTime: { type: Date, required: true },
  description: { type: String, required: true },
  idMaintenance: { type: Object },
  codeBarre: { type: String },
  subCat: { type: String },
  categorie: { type: String },
  status: { type: String },
  idTech: { type: String },
  idHopital: { type: Object }
});



mongoose.model("DateMaintenance", dateMaintenanceSchema);
//TODO  Construtor ??
