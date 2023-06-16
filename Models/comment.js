const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    
    body: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    agreeCounter: {
        type: Number,
    },
    // Relationship Here 
    EmployeeAuther:{
       type: mongoose.Schema.Types.ObjectId,
       ref:"Employee"
    }
},
{
    timestamps: true,
})

const Challenge = mongoose.model("Comment", challengeSchema);

module.exports = Comment;