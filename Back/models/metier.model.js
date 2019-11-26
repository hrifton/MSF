const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  color: { type: String, required: true, unique: true },
  categorie: [{_id : false ,name: { type: String }}]
});

mongoose.model("Metier", userSchema);
