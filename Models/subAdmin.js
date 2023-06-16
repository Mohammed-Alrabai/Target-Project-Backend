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
  },
  {
    timestamps: true,
  }
);

const subAdmin = mongoose.model("subAdmin", subAdminSchema);

module.exports = subAdmin;
