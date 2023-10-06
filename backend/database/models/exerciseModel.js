const mongoose = require('mongoose');

const exerciseSchema= new mongoose.Schema({
    exerciseName:{
        type: String,
        required:true
    },
    exerciseDuration:{
        type:String,
        required:true
    },
    calories:Number
})

const Exercise = mongoose.model("Exercise",exerciseSchema);

module.exports = Exercise