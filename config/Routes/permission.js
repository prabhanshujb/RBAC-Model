const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Permission = require("../models/permissionsmodel");
const permissionController = require('../controllers/permissionCont')

router.get('/', permissionController.permissionGet),

router.post('/', permissionController.permissionCreate),

router.get('/:permissionId', permissionController.permissionGetId),

router.patch('/:permissionId', permissionController.permissionUpdate),

router.delete('/:permissionId', permissionController.permissionUpdate),

module.exports = router;