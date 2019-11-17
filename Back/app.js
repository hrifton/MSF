//#region require
//config serveur (port,environement: prod,dev,DB )
require("./config/config");
//Connexion a la DB
require("./models/db");
require("./config/passportConfig");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
//#endregion
//#region Routes

const rtsIntervention = require("./routes/intervention.route");
const rtsDepartement = require("./routes/departement.route");
const rtsSolution = require("./routes/solution.route");
const rtsMaintenance = require("./routes/maintenance.route");
const rtsDateMaintenance = require("./routes/dateMaintenance.route");
const rtsMetier = require("./routes/metier.route");
const rtsAsset = require("./routes/asset.route");
const rtsHostpital = require("./routes/hospital.route");
const rtsCategorie = require("./routes/categorie.route");
const rtsUser = require("./routes/user.route");
const rtsIndex = require("./routes/index.router");
//#endregion
// chargement express
var app = express();
let reporter = function(type, ...rest) {
  // remote reporter logic goes here
};
/* handle an uncaught exception & exit the process */
process.on('uncaughtException', function (err)
{
	console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
	console.error(err.stack);

	reporter("uncaughtException", (new Date).toUTCString(), err.message, err.stack);

	process.exit(1);
});

/* handle an unhandled promise rejection */
process.on('unhandledRejection', function (reason, promise)
{
	console.error('unhandled rejection:', reason.message || reason);

	reporter("uncaughtException", (new Date).toUTCString(), reason.message || reason);
})
//Taille Max Transfert pour enregistrement de maintenance a vérifier
app.use(bodyParser.json({ limit: "5mb" }));
//cros-origin
app.use(cors());
//module passport auth jws
app.use(passport.initialize());
//chargement des routes
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app
  .use("/api", rtsIndex)
  .use("/api/intervention", rtsIntervention)
  .use("/api/departement", rtsDepartement)
  .use("/api/solution", rtsSolution)
  .use("/api/maintenance", rtsMaintenance)
  .use("/api/datemaintenance", rtsDateMaintenance)
  .use("/api/asset", rtsAsset)
  .use("/api/hospital", rtsHostpital)
  .use("/api/categorie", rtsCategorie)
  .use("/api/user", rtsUser)
  .use("/api/metier", rtsMetier);

//Demarrage serveur
app.listen(process.env.PORT, () =>
  console.log(`server started at port :${process.env.PORT}`)
);
