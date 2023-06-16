//imports the express module
const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const Challenge = require('../Models/challeng')

//to view AllChallanges
exports.ChallangeList = (req,res)=>{
Challenge.find().then((challangeList)=>{
res.status(200).json({
    result:challangeList
})
}).catch((error)=>{
res.status(500).json({
  message: error,
})
})
}

// get challenge by id
exports.ChallengeById = (req,res)=>{
const ChallengId  = req.params.Id
Challenge.findById(ChallengId).then((theChallengResult)=>{
 res.status(200).json({
      result: theChallengResult,
    }).catch((error)=>{
res.status(500).json({
      message: error,
    });
    })
})
}