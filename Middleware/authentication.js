const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.signToken = async (req, res, next) => {
  // get data from admin Controller
  const admin = res.locals.adminData;
  // create token
  const token = jwt.sign({ admin }, process.env.JWT_SECRET);
  // send token
  res.status(200).json({
    admin,
    token,
  });
};

exports.verifyToken = (req, res, next) => {
  // get token from header
    const token = req.headers.authorization.split(" ")[1];
  // check token
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  // verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid Token");
    }
    // send data to controller
    res.locals.adminData = decoded.admin;
    next();
  });
}

exports.checkLogin = (req, res, next) => {
      if (!req.headers.authorization) {
        return res.status(401).json({
          message: "Please login"
        });
      }
      next();
    };
