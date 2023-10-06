const { json } = require("body-parser");
const ExerciseMethods = require("../database/exerciseMethods");

const addExerciseToData = async (req, res) => {
  const exerciseObj = req.body;
  try {
    if (!exerciseObj.exerciseName || !exerciseObj.exerciseDuration) {
      res.status(200).json({ message: "Invalid Body" });
    } else {
      const addedResult = await ExerciseMethods.addExercise(exerciseObj);
      console.log("controleer", addedResult);
      if (Object.keys(addedResult).length != 0) {
        res.status(201).json({ message: "Success", addedResult });
      } else {
        res.status(200).json({ message: "Failed" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getAllExercise = async(req,res) =>{
    try {
        const allExercise = await ExerciseMethods.getAllExercise();
        if (allExercise.length === 0) {
            res.status(200).json({message:"No exercise in database"});
        } else {
            console.log(allExercise);
            res.status(200).json({message:"All exercise",allExercise});
        }
    } catch (error) {
        res.status(500),json({message:'Could not get and error is',error})
    }
}

const deleteExercise = async(req,res) =>{
    const exerciseId = req.params.exerciseId;

    try {
        const deleted = await ExerciseMethods.deleteExercise(exerciseId);
        if (deleted) {
            res.status(200).json({message:"Exercise Deleted",deleted});
            
        } else {
            res.status(404).json({message:"Unsuccessful. Not Found"});
        }
    } catch (error) {
        res.status(500),json({message:'Could not Delete.',error})
    }
}

module.exports = {
  addExerciseToData,
  getAllExercise,
deleteExercise,
};
