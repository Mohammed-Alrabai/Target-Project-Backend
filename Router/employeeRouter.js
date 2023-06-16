const express = require("express");
const router = express.Router();
const employeeController = require('../Controller/employee')

router.get("/challengeList",employeeController.ChallangeList)
router.get("/ChallengeById/:id",employeeController.ChallengeById)



module.exports = router;