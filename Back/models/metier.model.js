const mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  color: { type: String, required: true, unique: true }
});



mongoose.model("Metier",userSchema);
