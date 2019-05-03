const mongoose = require("mongoose");

var dateMaintenanceSchema = new mongoose.Schema({
  StartTime: { type: Date, required: true },
  EndTime: { type: Date, required: true },
  idMaintenance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Maintenances",
    required: true
  }
});

mongoose.model("DateMaintenance", dateMaintenanceSchema);
