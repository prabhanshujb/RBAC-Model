const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//const Roles = require("../models/rolemodel");
const roleController = require('../controllers/roleCont');
const assignRolePermission = require('../controllers/assignRolePermCont');

router.get('/', roleController.role_get),

router.post('/', roleController.roleCreateNew),

router.get('/:roleId', roleController.roleGetId),

router.patch('/:roleId', roleController.roleUpdate),

router.delete('/:roleId', roleController.roleDelete),

router.post('/rolepermission', assignRolePermission.rolepermission)

module.exports = router;