const mongoose = require('mongoose');
const goalSchema= new mongoose.Schema({
    goalName:{
        type:String,
        required:true
    },
    goalDescription:{
        type:String,
        required:true
    },
    targetDate:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        required:true
    },

})

const Goal = mongoose.model("Goal",goalSchema);

module.exports = Goal;