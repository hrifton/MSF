const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
mongoose.plugin(Schema => {
  Schema.pre("findByIdAndUpdate", setRunValidators);
});
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
      _id:{type:Object},
      name: { type: String },
      descriptif: { type: String },
      color: { type: String },
      categorie: [
        {
          type: Object
        }
      ]
    }
  ]
});

hospitalSchema.pre("save", function(next) {
  console.log("calling next!");
  // `return next();` will make sure the rest of this function doesn't run
  /*return*/ next();
  console.log("after next");
});
function setRunValidators() {
  this.setOptions({ runValidators: true });
}
mongoose.model("Hospital", hospitalSchema);
hospitalSchema.plugin(uniqueValidator);
