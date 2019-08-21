const mongoose = require("mongoose");

var dateMaintenanceSchema = new mongoose.Schema({
  StartTime: { type: String, required: true },
  EndTime: { type: String, required: true },
  idMaintenance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Maintenances",
    required: true
  },
  codeBarre: { type: String }
});



mongoose.model("DateMaintenance", dateMaintenanceSchema);
//TODO  Construtor ??
