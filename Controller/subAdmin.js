//imports the express module
const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const saltRounds = Number(process.env.salt);
dotenv.config();

// import the subAdmin model
const SubAdmin = require("../Models/subAdmin.js");
// import the challenge model
const Challenge = require("../Models/challeng.js");
// import the goal model
const Goal = require("../Models/goal.js");
//import the employee
const Employee = require("../Models/employee")


///create subadmin for trying code
exports.createSubAdmin = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const role = req.body.role;
  const passHash = await bcrypt.hash(password, saltRounds);

  const newsubAdmin = new SubAdmin({
    username: username,
    password: passHash,
    email: email,
    userRole: role,
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

//subAdmin login
exports.subAdminLogin = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  SubAdmin.findOne({ username: username })
    .select("+password")
    .then(async (result) => {
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

//create Challange
exports.createChallange= (req,res)=>{
const title = req.body.title
const body = req.body.body
const proved = req.body.proved
const subAdmin = res.locals.decoded;
const subAdminId = subAdmin.result._id;

const newChallange = new Challenge({
    title:title,
    body:body,
    proved:proved
})
newChallange.save().then((challeng)=>{
SubAdmin.findById(subAdminId).then((subAdmin)=>{
    subAdmin.challenges.push(challeng._id)
    subAdmin.save().then((savedChallange)=>{
    console.log(savedChallange)
    })
}).catch((error)=>{
     res.status(500).json({
            message: error,
          });
})
res.status(200).json({
        result: challeng,
      });
})
}

//create Private Goal
exports.createPrivateGoal = (req,res)=>{
const title = req.body.title
const body = req.body.body
const type = req.body.type
const subAdmin = res.locals.decoded;
const subAdminId = subAdmin.result._id;

const newGoal = new Goal({
title:title,
body:body,
type:type
})
newGoal.save().then((savedGoal)=>{
SubAdmin.findById(subAdminId).then((subAdmin)=>{
subAdmin.Goals.push(savedGoal._id)
subAdmin.save().then((savedsubAdmin)=>{
console.log(savedsubAdmin)
}).catch((error)=>{
 res.status(500).json({
            message: error,
          });
})
})
res.status(200).json({
        result: savedGoal,
      });
}).catch((error)=>{
 res.status(500).json({
            message: error,
          });
        })

}
//Employee CRUD
exports.employeeList = (req,res)=>{
Employee.find().then((allEmployee)=>{
  res.status(200).json({
      result: allEmployee,
  })
}).catch((error)=>{
 res.status(500).json({
            message: error,
          });
        })
}