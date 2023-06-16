const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    isPin: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
    },
    // Relationship Here
    AdminAuthor:{
    type: mongoose.Schema.Types.ObjectId,
       ref:"Admin"
    },
    SubAdminAuther:{
        type: mongoose.Schema.Types.ObjectId,
       ref:"subAdmin"
    }
},
{
    timestamps: true,
})

const goal = new mongoose.model("Goal", goalSchema);

module.exports = goal;