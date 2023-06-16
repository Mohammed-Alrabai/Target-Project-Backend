const express = require("express");
const router = express.Router();
const { createAdmin } = require("../Controller/admin");

router.post("/", createAdmin);

module.exports = router;
