const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const {authGuard} = require('../middleware/authGuard');

router.get('/',authGuard, userController.getUsersForSidebar);
router.patch('/updatepassword', authGuard,userController.updateUserPassword);
router.patch('/updateuserinfo',authGuard,userController.updateUserInfo);
module.exports = router;