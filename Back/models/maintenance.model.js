const mongoose = require("mongoose");
var maintenanceSchema = new mongoose.Schema({
  maintenance: { type: String, required: true },
  executor: { type: String, required: true },
  periodicity: { type: String, required: true },
  duration: { type: String, required: true },
  interval: { type: Number, required: true },
  description: { type: String, required: true }
});

mongoose.model("Maintenance", maintenanceSchema);
