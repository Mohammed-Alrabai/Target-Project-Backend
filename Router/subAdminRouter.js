const express = require("express");
const router = express.Router();
const subAdminController = require('../Controller/subAdmin')
const {verifyToken , checkLogin} =require('../Middleware/authentication')

router.post("/CreateSubAdmin",subAdminController.createSubAdmin)
router.post("/subAdminLogin",subAdminController.subAdminLogin)
router.post("/createChallange",verifyToken,subAdminController.createChallange)
router.post("/createGoal",verifyToken,subAdminController.createPrivateGoal)
router.get("/employeeList",subAdminController.employeeList)
router.patch("/employeeUpdate/:id",subAdminController.employeeUpdate)
router.post("/Createemployee",subAdminController.Createemployee)
module.exports = router;