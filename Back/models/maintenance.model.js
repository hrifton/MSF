const mongoose = require("mongoose");
var maintenanceSchema = new mongoose.Schema({
  executor: { type: String, required: true },
  periodicity: { type: String, required: true },
  duration: { type: String, required: true },
  recurrence: { type: String, required: true }
});

mongoose.model("Maintenance", maintenanceSchema);
