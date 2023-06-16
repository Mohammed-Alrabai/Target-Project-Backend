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

    // Relationship Here
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
