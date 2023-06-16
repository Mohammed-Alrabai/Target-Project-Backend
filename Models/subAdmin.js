const mongoose = require("mongoose");

const subAdminSchema = new mongoose.Schema(
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
    email: {
      type: String,
      unique: true,
    },
    // Relationship Here
     Department:{
       type: mongoose.Schema.Types.ObjectId,
       ref:"Department"
    },
     challenges:[{
       type: mongoose.Schema.Types.ObjectId,
       ref:"Challenge"
    }],
    Goals:[{
      type: mongoose.Schema.Types.ObjectId,
       ref:"Goal"
    }],
    
  },
  {
    timestamps: true,
  }
);

const subAdmin = mongoose.model("subAdmin", subAdminSchema);

module.exports = subAdmin;
