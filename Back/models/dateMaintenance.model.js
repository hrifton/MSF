const mongoose = require("mongoose");

var dateMaintenanceSchema = new mongoose.Schema({
  dateStart: { type: Date, required: true },
  idMaintenance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Maintenances",
    required: true
  }
});

mongoose.model("DateMaintenance", dateMaintenanceSchema);
