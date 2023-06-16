const express = require("express");
const router = express.Router();
const { createAdmin, loginAdmin , getAdmin } = require("../Controller/admin");
const {signToken , verifyToken} = require("../Middleware/authentication");


// Create Admin
router.post("/", createAdmin);
// Login Admin
router.get("/login", loginAdmin , signToken);
router.get("/admin", verifyToken , getAdmin);

module.exports = router;
