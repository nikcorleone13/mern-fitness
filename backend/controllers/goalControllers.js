const GoalMethod = require("../database/goalMethods");

const addGoalToDatabase = async (req, res) => {
  const goalObj = req.body;
  try {
    if (
      !goalObj.goalName ||
      !goalObj.goalDescription ||
      !goalObj.targetDate ||
      !goalObj.status
    ) {
      res.status(200).json({ message: "Invalid Body" });
    } else {
      const addedResult = await GoalMethod.addGoalToDatabase(goalObj);
      console.log("Added", addedResult);
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

const getAllGoals = async (req, res) => {
  try {
    const allGoals = await GoalMethod.getAllGoals();
    if (allGoals.length === 0) {
      res.status(200).json({ message: "No Goals in database" });
    } else {
      console.log(allGoals);
      res.status(200).json({ message: "All Goals", allGoals });
    }
  } catch (error) {
    res.status(500), json({ message: "Could not get and error is", error });
  }
};

const deleteGoal = async (req, res) => {
  const goalId = req.params.goalId;

  try {
    const deleted = await GoalMethod.deleteGoal(goalId);
    if (deleted) {
      res.status(200).json({ message: "Goal Deleted", deleted });
    } else {
      res.status(404).json({ message: "Unsuccessful. Not Found" });
    }
  } catch (error) {
    res.status(500), json({ message: "Error.", error });
  }
};
module.exports = { addGoalToDatabase, getAllGoals, deleteGoal };
