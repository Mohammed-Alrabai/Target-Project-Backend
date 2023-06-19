const express = require("express");
const router = express.Router();
const DepartmentController = require('../Controller/Department')
const {verifyToken , checkLogin} =require('../Middleware/authentication')

router.post("/createDepartment",DepartmentController.createDepartment);
router.get("/DepartmentList",DepartmentController.DepartmentList)

module.exports = router;