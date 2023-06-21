const express = require("express");
const router = express.Router();
const employeeController = require("../Controller/employee");
const { verifyToken, checkLogin } = require("../Middleware/authentication");

router.get("/challengeList", checkLogin, employeeController.ChallangeList);
router.get("/ChallengeById/:id", employeeController.ChallengeById);
router.post("/CreateEmp", employeeController.CreateEmployee);
router.post("/emplogin", employeeController.EmployeeLogin);
router.post("/Comment/:id", verifyToken, employeeController.Comment);

module.exports = router;
