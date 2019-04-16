const mongoose = require("mongoose");
var departementSchema = new mongoose.Schema({
  departement: { type: String, required: true }
});

mongoose.model("Departement", departementSchema);
