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
  const username = req.body.username;
  const password = req.body.password;
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
    .catch((error) => {
      res.json(error);
    });
};

//employee Login
exports.EmployeeLogin = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  Employee.findOne({ username: username })
  .select("+password")
    .then(async (result) => {
       const hashedPass = result.password;
      const compare = await bcrypt.compare(password, hashedPass);
      if (compare) {
        const token = jwt.sign({ result }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        console.log(token)
        res.status(200).json({ token: token,result: result });
      }
    })
    .catch((error) => {
      res.status(404).json({
        message: error,
      })
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
    .catch((error) => {
      res.status(500).json({
        message: error,
      });
    });
};

// get challenge by id
exports.ChallengeById = (req, res) => {
  const ChallengId = req.params.id;
  Challenge.findById(ChallengId)
    .then((theChallengResult) => {
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

////comment 
exports.CommentChallengeById = async(req, res) => {
 const ChallengId = req.params.id;
 const reponse = await Challenge.findById(ChallengId).populate({path:'comments',
populate:{
  path:'EmployeeAuther',
  model:'employee'
}})
     res.status(200).json({
       reponse
      });
};



// get challenge by id
exports.Comment = (req, res) => {
  const ChallengId = req.params.id;
  const inputbody = req.body.inputbody;
  const emp = res.locals.decoded;
  const empId = emp.result._id;

  const newComment = new Comment({
    body: inputbody,
    EmployeeAuther: empId,
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
            res.status(500).json({
            message: error,
          });
        });

         Challenge.findById(ChallengId)
        .then((foundedChallange) => {
          foundedChallange.comments.push(newCommentResult._id)
          foundedChallange.save().then((savedComment1) => {
           console.log(savedComment1)
          });
        })
        .catch((error) => {
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


exports.Comment1 = (req, res) => {
  const ChallengId = req.params.id;
  const inputbody = req.body.inputbody;
  
  const newComment = new Comment({
    body: inputbody,
   
  });

  newComment
    .save()
    .then((newCommentResult) => {
      ///adding comment to the employee model (relationship)
  
         Challenge.findById(ChallengId)
        .then((foundedChallange) => {
          foundedChallange.comments.push(newCommentResult._id)
          foundedChallange.save().then((savedComment1) => {
           console.log(savedComment1)
          });
        })
        .catch((error) => {
            res.status(500).json({
            message: error,
          });
        });

      res.status(200).json({
        newCommentResult,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: error,
      });
    });
};

exports.CreateComment = (req,res)=>{
  const cbody = req.body.bodyc
  const ChallengId = req.params.id;
  const emp = res.locals.decoded;
  const empId = emp.result._id;
  
  const NewComment = new Comment({
    bodyc:cbody,
    ChallangeId:ChallengId,
    EmployeeAuther:empId
  })

NewComment.save().then((comment)=>{
  Employee.findById(empId).then((emp1)=>{
   emp1.comments.push(comment._id)
   emp1.save().then((res)=>{
    console.log("res")
   })
  })

  Challenge.findById(ChallengId).then((challange1)=>{
   challange1.comments.push(comment._id)
   challange1.save().then((res)=>{
     console.log("res")
   })
  
  })
   res.status(200).json({
        comment
      });
}).catch((error)=>{
  res.status(401).json({
        error,
      });
})
}


