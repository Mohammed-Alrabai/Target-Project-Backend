const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
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
    challenges:[{
       type: mongoose.Schema.Types.ObjectId,
       ref:"Challenge"
    }],
    Goals:[{
      type: mongoose.Schema.Types.ObjectId,
       ref:"Goal"
    }]
  },
  {
    timestamps: true,
  }
);



const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
