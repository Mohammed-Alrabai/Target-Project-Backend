const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    name: String,
    username: {
      type: String,
      unique: true,
    },
    password: String,
    email: String,

    // Relationship Here
    
  },
  {
    timestamps: true,
  }
);

const employee = mongoose.model("Employee",employeeSchema)

module.exports = employee;