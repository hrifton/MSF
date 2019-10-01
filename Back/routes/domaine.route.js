const express = require('express');
const domaineRoutes = express.Router();
const ctrlDomaine = require('../controllers/domaine.controller');


/**
 * Route return all domaine
 */
domaineRoutes.route("/").get((req,res)=>{
ctrlDomaine.all(req,res);
});

module.exports = domaineRoutes;