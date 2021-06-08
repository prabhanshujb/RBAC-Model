const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/usermodel");
const userController = require('../controllers/userCont')

router.post('/signup', userController.userRegister);

router.post("/login", userController.userlogin);


module.exports = router;
