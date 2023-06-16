const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.signToken = async (req, res, next) => {
  // get data from admin Controller
  const data = res.locals;
  // create token
  const token = jwt.sign({ data }, process.env.JWT_SECRET);
  // send token
  res.status(200).json({ data, token });
  res.status(401).json({ message: "Unauthorized" });
};

exports.verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: "Please login" });
  }
  // get token from header
  const token = req.headers.authorization.split(" ")[1];
  // verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Please login");
    }
    // send data to controller
    res.locals.adminData = decoded.admin;
    next();
  });
};

exports.checkLogin = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Please login",
    });
  }
  next();
};
