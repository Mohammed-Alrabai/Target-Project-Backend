//imports the express module
const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const Challenge = require('../Models/challeng.js')
const Comment = require('../Models/comment.js')

//to view AllChallanges
exports.ChallangeList = (req,res)=>{
Challenge.find().then((challangeList)=>{
res.status(200).json({
    result:challangeList
})
}).catch((err)=>{
res.status(500).json({
  message: err,
})
})
}

// get challenge by id
exports.ChallengeById = (req,res)=>{
const ChallengId  = req.params.id
console.log(ChallengId)
Challenge.findById(ChallengId).then((theChallengResult)=>{
  console.log(theChallengResult)
  res.status(200).json({
   result: theChallengResult
  })
}).catch((error)=>{
  res.status(500).json({
  message: error,
})
})
}

// get challenge by id
exports.Comment = (req,res)=>{
const ChallengId  = req.params.id
console.log(ChallengId)
const inputbody = req.body.inputbody
const newComment = new Comment({
  body:inputbody,
})

newComment.save().then((newCommentResult)=>{
  res.status(200).json({
   result: newCommentResult
  })
}).catch((error)=>{
  res.status(500).json({
  message: error,
})
})

}

