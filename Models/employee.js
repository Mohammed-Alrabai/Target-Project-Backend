const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    name: String,
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    email: String,
role:{
  type: String,
},
    // Relationship Here
     comments:[{
      type: mongoose.Schema.Types.ObjectId,
       ref:"Goal"
    }],
    Department:{
       type: mongoose.Schema.Types.ObjectId,
       ref:"Department"
    }
  },
  {
    timestamps: true,
  }
);

const employee = mongoose.model("Employee",employeeSchema)

module.exports = employee;