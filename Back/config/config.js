//check env.
var env = process.env.NODE_ENV || "developement";
//console.log(env);
//fetch env. config
var config = require("./config.json");
//console.log("*********************");
//console.log(config);
//console.log("---------------------");
var envConfig = config[env];
//add env.config values to process.env
//console.log(envConfig);
Object.keys(envConfig).forEach(key => (process.env[key] = envConfig[key]));
