const mongoose = require("mongoose");
var maintenanceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subCat: { type: String, required: true },
  categorie: { type: String, required: true },
  periodicity: { type: String, required: true },
  interval: { type: Number, required: true },
  description: { type: String, required: true }
});

mongoose.model("Maintenance", maintenanceSchema);
