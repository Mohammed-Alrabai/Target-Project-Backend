//imports the express module
const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const Challenge = require("../Models/challeng.js");
const Comment = require("../Models/comment.js");
const Employee = require("../Models/employee");
const saltRounds = Number(process.env.saltRounds);
//create employee
exports.CreateEmployee = async (req, res) => {
  const username = "mohammad";
  const password = "moh123";
  const passHash = await bcrypt.hash(password, saltRounds);

  const newEmployee = new Employee({
    username: username,
    password: passHash,
  });
  newEmployee
    .save()
    .then((newEmp) => {
      res.status(200).json({
        result: newEmp,
      });
    })
    .catch((err) => {
      res.json(err);
    });
};

//employee Login
exports.EmployeeLogin = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  Employee.findOne({ username: username })
    .select("+password")
    .then(async (result) => {
      console.log(result);
      const hashedPass = result.password;
      const compare = await bcrypt.compare(password, hashedPass);
      if (compare) {
        const token = jwt.sign({ result }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.status(200).json({ token: token });
      }
    })
    .catch((error) => {
      res.json(error);
    });
};

//to view AllChallanges
exports.ChallangeList = (req, res) => {
  Challenge.find()
    .then((challangeList) => {
      res.status(200).json({
        result: challangeList,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

// get challenge by id
exports.ChallengeById = (req, res) => {
  const ChallengId = req.params.id;
  console.log(ChallengId);
  Challenge.findById(ChallengId)
    .then((theChallengResult) => {
      console.log(theChallengResult);
      res.status(200).json({
        result: theChallengResult,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: error,
      });
    });
};

// get challenge by id
exports.Comment = (req, res) => {
  const ChallengId = req.params.id;
  console.log(ChallengId);
  const inputbody = req.body.inputbody;
  const emp = res.locals.decoded;
  console.log(emp);
  const empId = emp.result._id;

  const newComment = new Comment({
    body: inputbody,
    EmployeeAuther: ChallengId,
  });

  newComment
    .save()
    .then((newCommentResult) => {
      ///adding comment to the employee model (relationship)
      Employee.findById(empId)
        .then((employee) => {
          employee.comments.push(newCommentResult._id)
          employee.save().then((savedComment) => {
           console.log(savedComment)
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({
            message: error,
          });
        });

      res.status(200).json({
        result: newCommentResult,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: error,
      });
    });
};
