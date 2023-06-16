//imports the express module
const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

const saltRounds = Number(process.env.salt);
dotenv.config();

// import the admin model
const Admin = require("../Models/admin.js");
// import the challenge model
const Challenge = require("../Models/challeng.js");
// import the goal model
const Goal = require("../Models/goal.js");

// import the subAdmin model
const SubAdmin = require("../Models/subAdmin.js");

// create admin
exports.createAdmin = async (req, res) => {
  try {
    // hash password
    const password = "admin";
    const passHash = await bcrypt.hash(password, saltRounds);

    // create admin
    const adminData = await Admin.create({
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
// login admin
exports.loginAdmin = async (req, res, next) => {
  try {
    // get username and password from request
    const { username, password } = req.body;
    // find admin by username
    const adminData = await Admin.findOne({ username }).select("+password");
    // compare password
    const pass = await bcrypt.compare(password, adminData.password);
    // check if password is correct and admin exists , send data to middleware
    if (adminData && pass === true) {
      res.locals.admin = adminData;
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
    const adminData = await Admin.find();
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
  const decoded = res.locals.decoded;
  const adminId = decoded.data.admin._id;
  try {
    // create goal
    const goalData = await Goal.create({
      title: req.body.title,
      body: req.body.body,
      type: req.body.type,
      AdminAuthor: adminId,
    });
    // add goal to admin
    const admin = await Admin.findById(adminId).populate("Goals");
    admin.Goals.push(goalData._id);
    await admin.save();
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
    const goalData = await Goal.find();
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
    const goalData = await Goal.findById(req.params.id);
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
    const goalData = await Goal.findByIdAndUpdate(req.params.id, req.body);
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
    const goalData = await Goal.findByIdAndDelete(req.params.id);
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
  const decoded = res.locals.decoded;
  const adminId = decoded.data.admin._id;
  try {
    // create challenge
    const challengeData = await Challenge.create({
      title: req.body.title,
      body: req.body.body,
      AdminAuthor: adminId,
      type: req.body.type,
    });
    // add challenge to admin
    const admin = await Admin.findById(adminId).populate("challenges");
    admin.challenges.push(challengeData._id);
    await admin.save();
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
    const challengeData = await Challenge.find();
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
    const challengeData = await Challenge.findById(req.params.id);
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
    const challengeData = await Challenge.findByIdAndUpdate(
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
    const challengeData = await Challenge.findByIdAndDelete(req.params.id);
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
// end challenge function
// subAdmin function
const Department = require("../Models/department.js");

// create subAdmin
exports.createSubAdmin = async (req, res) => {
  try {
    // create subAdmin
    const subAdminData = await SubAdmin.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      Department: req.body.department,
    });
    // add subAdmin to department
    const department = await Department.findById(req.body.department).populate(
      "subAdmin"
    );
    department.subAdmin = subAdminData._id;
    await department.save();
    // send response json
    res.status(200).json({
      result: subAdminData,
    });
    // handle error
  } catch (error) {
    // handle error
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Username already exists",
      });
    } else {
      return res.status(500).json({
        message: error,
      });
    }
  }
};
// get all subAdmin
exports.getAllSubAdmin = async (req, res) => {
  try {
    // get all subAdmin
    const subAdminData = await SubAdmin.find();
    // send response json
    res.status(200).json({
      result: subAdminData,
    });
    // handle error
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

// end subAdmin function

// employee function

// import employee
const Employee = require("../Models/employee.js");

// get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    // get all employees
    const employeeData = await Employee.find();
    // send response json
    res.status(200).json({
      result: employeeData,
    });
    // handle error
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
