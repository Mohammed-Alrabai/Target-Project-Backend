//imports the express module
const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();

const saltRounds = Number(process.env.saltRounds);
// import the admin model
const admin = require("../Models/admin.js");
// import the challenge model
const challenge = require("../Models/challeng.js");

// create admin
exports.createAdmin = async (req, res) => {
  try {
    // hash password
    const password = "admin";
    const passHash = await bcrypt.hash(password, saltRounds);

    // create admin
    const adminData = await admin.create({
      name: "admin",
      username: "admin",
      password: passHash,
      email: "admin@admin.com",
    });
    // send response json
    res.status(200).json({
      result: adminData,
    });
    // handle error
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        message: "Username already exists",
      });
    } else {
      res.status(500).json({
        message: error,
      });
    }
  }
};
//
// login admin
exports.loginAdmin = async (req, res, next) => {
  try {
    // get username and password from request
    const { username, password } = req.body;
    // find admin by username
    const adminData = await admin.findOne({ username }).select("+password");
    // compare password
    const pass = await bcrypt.compare(password, adminData.password);
    // check if password is correct and admin exists , send data to middleware
    if (adminData && pass === true) {
      res.locals.adminData = adminData;
      next();
      // handle error for username and password
    } else {
      res.status(400).json({
        message: "Invalid Username or Password",
      });
    }
    // handle error
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

exports.getAdmin = async (req, res) => {
  try {
    // get all admin
    const adminData = await admin.find();
    // send response json
    res.status(200).json({
      result: adminData,
    });
    // handle error
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
