//La variable env  stocke l’environnement actuel.
var env = process.env.NODE_ENV || "developement";
/**
 * fichier de configuration de l'environement
 * le fichier config.json à deux type de configuration d'environement
 * developpement et production
 *
 */
var config = require("./config.json");

var envConfig = config[env];

/**
 *Les paramètres de configuration sont extraits dans  envConfig en fonction de l'environnement.
 *À l'intérieur de la boucle foreach, chacun d'entre eux est poussé dans la  collection clé-valeur de process.env
 *Désormais, il est facile d’accéder à PORT ou à MONGODB_URI à partir de n’importe où dans l’application en utilisant  process.env.
 */
Object.keys(envConfig).forEach(key => (process.env[key] = envConfig[key]));
