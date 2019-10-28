const express = require("express");
const userRoutes = express.Router();
const ctrlUser = require("../controllers/user.controller");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

//Register
userRoutes.route("/add").post(function(req, res) {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, msg: "Failed to register user" });
    } else {
      res.json({ success: true, msg: "User registered" });
    }
  });
});
userRoutes.route("/:id").get(function(req,res){
console.log("route id",req)
  ctrlUser.getUser(req,res);
})
userRoutes.route("/userbyhospital").get(function(req, res) {
  console.log(req);
});




module.exports = userRoutes;
function newFunction() {
  return "/register";
}
