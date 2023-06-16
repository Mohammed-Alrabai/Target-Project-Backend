// imports the express module
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const database = require("./Config/Database");
const cors = require("cors");

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 8000;

// connecting to the database
database();
// Require routes
const adminRouter = require("./Router/adminRouter.js");

// Api routes

// Api routes for employees

// Api routes for admin
// https://localhost:8000/api/admin
app.use("/api/admin", adminRouter);

// Api routes for departments

app.listen(port, () => {
  console.log("listening on http://localhost:" + port);
});
