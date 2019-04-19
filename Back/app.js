require("./config/config");
require("./models/db");
require("./config/passportConfig");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

const rtsIndex = require("./routes/index.router");
const rtsIntervention = require("./routes/intervention.route");
const rtsDepartement = require("./routes/departement.route");
const rtsSolution = require("./routes/solution.route");

var app = express();
//middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use("/api", rtsIndex);
app
  .use("/api", rtsIndex)
  .use("/api/intervention", rtsIntervention)
  .use("/api/departement", rtsDepartement)
  .use("/api/solution", rtsSolution);

//Error handler
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    var valErrors = [];
    Object.keys(err.errors).forEach(key =>
      valErrors.push(err.errors[key].message)
    );
    res.status(422).send(valErrors);
  }
});

//start server
app.listen(process.env.PORT, () =>
  console.log(`server started at port :${process.env.PORT}`)
);
