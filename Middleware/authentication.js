const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.signToken = async (req, res, next) => {
  try {
      // get data from admin Controller
  const data = res.locals;
  // create token
  const token = jwt.sign({ data }, process.env.JWT_SECRET);
  // send token
  res.status(200).json({
    data , token,
  })
  }
  catch (error) {
    res.status(500).json({
      message: error,
    });
  }  
};

exports.verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: "Please login" });
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    res.locals.decoded = decoded;
    console.log("nnnnnnnnnnnnnnn")
    console.log(decoded)
    next();
  } catch (err) {
    res.status(401).json({ massage: "Please Login" });
  }
};

exports.checkLogin = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Please login",
    });
  }
  next();
};
