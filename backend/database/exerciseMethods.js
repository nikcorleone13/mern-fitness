const mongoose = require("mongoose");
const Exercise = require("./models/exerciseModel");

const addExercise = async (exerciseObj) => {

  try {
    const newExercise = new Exercise({
      exerciseName: exerciseObj.exerciseName,
      exerciseDuration: exerciseObj.exerciseDuration,
      calories: 10 * exerciseObj.exerciseDuration,
    });
    const savedExercise = await newExercise.save();
    return savedExercise;
  } catch (error) {
    return error;
  }
};

const getAllExercise = async() =>{
    try {
        const allExercise = await Exercise.find({});
        return allExercise;
    } catch (error) {
        return error
    }
}

const deleteExercise = async(exerciseId) =>{
    try {
        const deleted = await Exercise.findByIdAndDelete(exerciseId);
        console.log("DEL:",deleted);
        return deleted
    } catch (error) {
        return error
    }
}

module.exports = {
  addExercise,
  getAllExercise,
  deleteExercise
};
