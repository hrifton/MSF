const mongoose = require("mongoose");
/**
 * resolution deprecation
 * (node:6804) DeprecationWarning: current URL string parser is deprecated,
 * and will be removed in a future version. To use the new parser,
 * pass option { useNewUrlParser: true } to MongoClient.connect.
 */
mongoose.connect(
  process.env.MONGODB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  err => {
    console.log(process.env.MONGODB_URL)
    if (!err) {
      console.log("MongoDB Connection ok!!!");
    } else {
      console.log("MongoDB Connection:=>" + JSON.stringify(err, undefined, 2));
    }
  }
);

require("../models/user.model");
