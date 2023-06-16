const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    proved: {
      type: Boolean,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    terminated: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["public", "private", "manager"],
      default: "public",
    },
    // Relationship Here
    AdminAuthor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    SubAdminAuther: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subAdmin",
    },
  },
  {
    timestamps: true,
  }
);
//
const Challenge = mongoose.model("Challenge", challengeSchema);

module.exports = Challenge;
