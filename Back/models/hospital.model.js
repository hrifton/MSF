const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

var hospitalSchema = new mongoose.Schema({
  _id: { type: Number },
  name: { type: String, unique: true, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  slug: { type: String, required: true },
  zipCode: { type: String },
  address: { type: String },
  number: { type: String }
});

hospitalSchema.plugin(AutoIncrement);
mongoose.model("Hospital", hospitalSchema);
