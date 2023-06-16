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
  deleteChallenge
} = require("../Controller/admin");
const { signToken, verifyToken } = require("../Middleware/authentication");

// Create Admin
router.post("/", createAdmin);
// Login Admin
router.get("/login", loginAdmin, signToken);
router.get("/admin", verifyToken, getAdmin);

// Goals route
router.post("/createGoal", verifyToken, createGoal);
router.get("/goals", verifyToken, getAllGoals);
router.get("/goal/:id", verifyToken, getGoalById);
router.patch("/updateGoal/:id", verifyToken, updateGoal);
router.delete("/deleteGoal/:id", verifyToken, deleteGoal);
// challenge route
router.post("/createChallenge", verifyToken, createChallenge);
router.get("/challenge", verifyToken , getAllChallenges);
router.get("/challenge/:id", verifyToken , getChallengeById);
router.patch("/updateChallenge/:id", verifyToken , updateChallenge);
router.delete("/deleteChallenge/:id", verifyToken, deleteChallenge);

module.exports = router;
