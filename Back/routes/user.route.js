const express = require("express");
const userRoutes = express.Router();
const ctrlUser = require('../controllers/user.controller')
/*const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
*/
//const User = require("../models/user.model");

//Register
userRoutes.route("/add").post(function(req, res, next) {
 ctrlUser.register(req, res, next);
});

userRoutes.route("/").get(function(req, res) {
  ctrlUser.all(req, res);
});

userRoutes.route("/check").get(function(req, res) {
  ctrlUser.check(req, res);
});

userRoutes.route("/allTech").post(function(req, res) {
  console.log("tech")
  ctrlUser.getTech(req, res);
});

module.exports = userRoutes;

