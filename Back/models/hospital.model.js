const mongoose = require("mongoose");
var hospitalSchema = new mongoose.Schema({
  projectCode: { type: "String", unique: true, sparse: true, required: true },
  country: { type: String, required: true },
  project: { type: "String", unique: true, required: true },
  startingDate: { type: String, required: true },
  closuredate: { type: String },
  ipdStructure: { type: String },
  leveOfCare: { type: String },
  metier: [
    {
      _id: { type: Object },
      name: { type: String },
      descriptif: { type: String },
      color: { type: String },
      categorie: [{ _id: false, name: { type: String } }]
    }
  ],
  departements: [
    {
      type: Object
    }
  ],
  maintenance: [
    {
      _id: { type: Object },
      type: Object
    }
  ]
});

mongoose.model("Hospital", hospitalSchema);
