//imports the express module
const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

const  saltRounds = Number(process.env.salt);

dotenv.config();

const saltRounds = Number(process.env.saltRounds);
// import the admin model
const admin = require("../Models/admin.js");
// import the challenge model
const challenge = require("../Models/challeng.js");
// import the goal model
const goal = require("../Models/goal.js");

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
// get all admin
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

// goals function
// create goal
exports.createGoal = async (req, res) => {
  try {
    // get data from request
    const data = req.body;
    // create goal
    const goalData = await goal.create(data);
    // send response json
    res.status(200).json({
      result: goalData,
    });
    // handle error
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
// get all goals
exports.getAllGoals = async (req, res) => {
  try {
    // get all goals
    const goalData = await goal.find();
    // send response json
    res.status(200).json({
      result: goalData,
    });
    // handle error
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
// get goal by id
exports.getGoalById = async (req, res) => {
  try {
    // get goal by id
    const goalData = await goal.findById(req.params.id);
    // send response json
    res.status(200).json({
      result: goalData,
    });
    // handle error
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
// update goal
exports.updateGoal = async (req, res) => {
  try {
    // get goal by id
    const goalData = await goal.findByIdAndUpdate(req.params.id, req.body);
    // handle error
    if (!goalData) {
      return res.status(404).json({
        massage: "Goal not found",
      });
    }
    // send response json
    res.status(200).json({
      result: goalData,
    });
    // handle error
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
// delete goal
exports.deleteGoal = async (req, res) => {
  try {
    // get goal by id
    const goalData = await goal.findByIdAndDelete(req.params.id);
    // handle error
    if (!goalData) {
      return res.status(404).json({
        massage: "Goal not found",
      });
    }
    // send response json
    res.status(200).json({
      result: goalData,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

// end goals function

// challenge function

// create challenge
exports.createChallenge = async (req, res) => {
  try {
    // get data from request
    const data = req.body;
    // create challenge
    const challengeData = await challenge.create(data);
    // send response json
    res.status(200).json({
      result: challengeData,
    });
    // handle error
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
// get all challenges
exports.getAllChallenges = async (req, res) => {
  try {
    // get all challenges
    const challengeData = await challenge.find();
    // send response json
    res.status(200).json({
      result: challengeData,
    });
    // handle error
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
// get challenge by id
exports.getChallengeById = async (req, res) => {
  try {
    // get challenge by id
    const challengeData = await challenge.findById(req.params.id);
    // send response json
    res.status(200).json({
      result: challengeData,
    });
    // handle error
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
// update challenge
exports.updateChallenge = async (req, res) => {
  try {
    // get challenge by id
    const challengeData = await challenge.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    // handle error
      if (!challengeData) {
        return res.status(404).json({
          massage: "Challenge not found",
        });
      }
    // send response json
    res.status(200).json({
      result: challengeData,
    });
    // handle error
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
// delete challenge
exports.deleteChallenge = async (req, res) => {
  try {
    // get challenge by id
    const challengeData = await challenge.findByIdAndDelete(req.params.id);
    // handle error
    if (!challengeData) {
      return res.status(404).json({
        massage: "Challenge not found",
      })
    }
    // send response json
    res.status(200).json({
      result: challengeData,
    });
    // handle error
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
// end challenge function
