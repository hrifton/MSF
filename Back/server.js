const express = require("express"),
  path = require("path"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  config = require("./DB");
const password = require("passport");
const app = express();

//Body Parser Middleware
app.use(bodyParser.json());
//CORS Middleware
app.use(cors());

//Route
const interventionRoute = require("./routes/intervention.route");
const departementRoute = require("./routes/departement.route");
const metierRoute = require("./routes/metier.route");

//index Route
app
  .use("/intervention", interventionRoute)
  .use("/departement", departementRoute)
  .use("/metier", metierRoute);

//Number Port
const port = process.env.PORT || 4000;
//startServer
const server = app.listen(port, function() {
  console.log("Listening on port " + port);
});
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {
    console.log("Database is connected");
  },
  err => {
    console.log("Can not connect to the database" + err);
  }
);
