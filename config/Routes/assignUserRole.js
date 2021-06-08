const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Permission = require("../models/userRoleModel");
const userRoleController = require('../controllers/userRoleCont')

router.post('/', userRoleController.userRoleCreate),

module.exports = router;