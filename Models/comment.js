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
    },
       ChallangeId:{
       type: mongoose.Schema.Types.ObjectId,
       ref:"Challenge"
    }

},
{
    timestamps: true,
})

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;