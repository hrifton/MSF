const mongoose = require("mongoose");
var categorieScheam = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  color: { type: String, required: true, unique: true }
});

mongoose.model("Categorie", categorieScheam);
