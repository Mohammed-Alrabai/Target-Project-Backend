const express = require("express");
const router = express.Router();
const {
  createAdmin,
  loginAdmin,
  getAdmin,
  // import goals function
  createGoal,
  getAllGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
  // import challenge function
  createChallenge,
  getAllChallenges,
  getChallengeById,
  updateChallenge,
  deleteChallenge,
  // import subAdmin function
  createSubAdmin,
  getAllSubAdmin,
  getSubAdminById,
  updateSubAdmin,
  deleteSubAdmin,
  // import employee function
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  deleteEmployee,
  updateEmployee,
CreateEmployee1
} = require("../Controller/admin");
const { signToken, verifyToken } = require("../Middleware/authentication");
const isAuth = require("../Middleware/authorization");
// Create Admin
router.post("/", createAdmin);
// Login Admin
router.post("/login", loginAdmin, signToken);
router.get("/admin", verifyToken, getAdmin);

// Goals route
router.post("/createGoal", verifyToken, isAuth, createGoal);
router.get("/goals", verifyToken, getAllGoals);
router.get("/goal/:id", verifyToken, getGoalById);
router.patch("/updateGoal/:id", verifyToken, updateGoal);
router.delete("/deleteGoal/:id", verifyToken, deleteGoal);
// challenge route
router.post("/createChallenge", createChallenge);
router.get("/challenge", getAllChallenges);
router.get("/challenge/:id", verifyToken, getChallengeById);
router.patch("/updateChallenge/:id", verifyToken, updateChallenge);
router.delete("/deleteChallenge/:id", verifyToken, deleteChallenge);

// subAdmin route
router.post("/createSubAdmin", verifyToken, createSubAdmin);
router.get("/subAdmin", verifyToken, getAllSubAdmin);
router.get("/subAdmin/:id", verifyToken, getSubAdminById);
router.patch("/updateSubAdmin/:id", verifyToken, updateSubAdmin);
router.delete("/deleteSubAdmin/:id", verifyToken, deleteSubAdmin);
// employee route
router.get("/employee", getAllEmployees);
router.get("/employee/:id", getEmployeeById);
router.post("/createEmployee", CreateEmployee1);
router.delete("/deleteEmployee/:id", deleteEmployee);
router.patch("/updateEmployee/:id", updateEmployee);

module.exports = router;
