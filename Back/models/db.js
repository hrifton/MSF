const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, err => {
  if (!err) {
    console.log("MongoDB Connection ok!!!");
  } else {
    console.log("MongoDB Connection:=>" + JSON.stringify(err, undefined, 2));
  }
});

require("../models/user.model");
