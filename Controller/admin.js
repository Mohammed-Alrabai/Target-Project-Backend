const express = require('express');

const admin = require("../Models/admin.js");

exports.createAdmin = async (req, res) => {
    try {
        const adminData = await admin.create({
            name: "admin",
            username: "admin",
            password: "admin",
            email: "admin@admin.com",
        });
        res.status(200).json({
            "result": adminData,
        });
    } catch (error) {
        res.status(500).json({
            "message": error
        })
    }
    }