//var Odoo = require("../../../node_modules/node-odoo");

var odoo = new Odoo({
  host: "https://trackmystuff-dev.ocb.msf.org",
  port: 4569,
  database: "MSF",
  username: "HQ@brussels.msf.org",
  password: "TMS123"
});

// Connect to Odoo
odoo.connect(function(err) {
  if (err) {
    return console.log(err);
  }

  // Get a partner
  odoo.get("res.partner", 4, function(err, partner) {
    if (err) {
      return console.log(err);
    }

    console.log("Partner", partner);
  });
});
