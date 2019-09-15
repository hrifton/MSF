//check env.
var env = "developement";
//recupere env. config : port, url connexion MongoDB, code secret JWT, temps d'expiration d'une session
var config = require("./config.json");
//env.config values to process.env
var envConfig = config[env];
//chargement des paramettre dans process.env
Object.keys(envConfig).forEach(key => (process.env[key] = envConfig[key]));
 