const express = require("express");
const router = express.Router();
const employeeController = require('../Controller/employee')
const {verifyToken , checkLogin} =require('../Middleware/authentication')

router.get("/challengeList", checkLogin, employeeController.ChallangeList);
router.get("/ChallengeById/:id",employeeController.ChallengeById)
router.get("/CommentChallengeById/:id",employeeController.CommentChallengeById)
router.post("/CreateEmp",employeeController.CreateEmployee)
router.post("/emplogin", employeeController.EmployeeLogin);
router.post("/Comment/:id",verifyToken, employeeController.Comment)
router.post("/CreateComment/:id",verifyToken,employeeController.CreateComment)


module.exports = router;