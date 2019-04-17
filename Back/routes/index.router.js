const express = require("express");
const router = express.Router();

const ctrlUser = require("../controllers/user.controller");
const jwtHelper = require("../config/jwtHelper");

router.post("/register", ctrlUser.register);
router.post("/authenticate", ctrlUser.authenticate);
router.get("/userProfil", jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get("/techs", ctrlUser.getTech);
module.exports = router;
