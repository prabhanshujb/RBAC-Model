const express = require("express");
const router = express.Router();

const userController = require('../controllers/userCont')
const userRoleController = require('../controllers/userRoleCont')

router.post('/signup', userController.userRegister);

router.post("/login", userController.userlogin);

router.post('/assignRoles', userRoleController.assignRoles),

module.exports = router;
