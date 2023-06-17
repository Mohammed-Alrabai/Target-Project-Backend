//imports the express module
const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const saltRounds = Number(process.env.salt);
dotenv.config();

// import the subAdmin model
const subAdmin = require("../Models/subAdmin.js");
// import the challenge model
const Challenge = require("../Models/challeng.js");
// import the goal model
const Goal = require("../Models/goal.js");

exports.createSubAdmin = async (req, res) => {
  const username = "mohammad";
  const password = "moh123";
  const passHash = await bcrypt.hash(password, saltRounds);

  const newsubAdmin = new subAdmin({
    username: username,
    password: passHash,
  });
  newsubAdmin
    .save()
    .then((newSubAdmin) => {
      res.status(200).json({
        result: newSubAdmin,
      });
    })
    .catch((error) => {
      res.json(error);
    });

}