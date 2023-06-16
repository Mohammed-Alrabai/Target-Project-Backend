const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    // Relationship Here
     subAdmin: {
         type: mongoose.Schema.Types.ObjectId,
       ref:"subAdmin"
    },
    depEmployee: [{
        type: mongoose.Schema.Types.ObjectId,
       ref:"Employee"
    }],
   depGoals:[{
      type: mongoose.Schema.Types.ObjectId,
       ref:"Goal"
    }],
     depChallenges:[{
       type: mongoose.Schema.Types.ObjectId,
       ref:"Challenge"
    }],
},
{
    timestamps: true,
})

const Challenge = mongoose.model("Department", challengeSchema);

module.exports = Department;