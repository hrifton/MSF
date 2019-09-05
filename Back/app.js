require("./config/config");
require("./models/db");
require("./config/passportConfig");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

//import { swaggerUI } from "swagger-ui-express";
//import { swaggerDocument } from "./config/swagge.json";

const rtsIndex = require("./routes/index.router");
const rtsIntervention = require("./routes/intervention.route");
const rtsDepartement = require("./routes/departement.route");
const rtsSolution = require("./routes/solution.route");
const rtsMaintenance = require("./routes/maintenance.route");
const rtsDateMaintenance = require("./routes/dateMaintenance.route");
const rtsMetier = require("./routes/metier.route");
const rtsAsset = require("./routes/asset.route");
const rtsDomaine = require("./routes/domaine.route");
const rtsHostpital = require("./routes/hospital.route");

var app = express();
//Taille Max Transfert
app.use(bodyParser.json({ limit: "5mb" }));
//middleware
app.use(bodyParser.json());
app.use(cors());
/*app.use(
  "/api-docs",
  swaggerUI.save,
  swaggerUI.setup(swaggerDocument, { explorer: true })
);*/
app.use(passport.initialize());
app
  .use("/api", rtsIndex)
  .use("/api/intervention", rtsIntervention)
  .use("/api/departement", rtsDepartement)
  .use("/api/solution", rtsSolution)
  .use("/api/maintenance", rtsMaintenance)
  .use("/api/datemaintenance", rtsDateMaintenance)
  .use("/api/asset", rtsAsset)
  .use("/api/domaine", rtsDomaine)
  .use("/api/hospital", rtsHostpital)
  .use("/api/metier", rtsMetier);

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
