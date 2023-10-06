const Goal = require("./models/goalModel");

const addGoalToDatabase = async (goalObj) => {
  try {
    const newGoal = new Goal({
      goalName: goalObj.goalName,
      goalDescription: goalObj.goalDescription,
      targetDate: goalObj.targetDate,
      status: goalObj.status,
    });
    const savedGoal = await newGoal.save();
    return savedGoal;
  } catch (error) {
    return error;
  }
};

const getAllGoals = async () => {
  try {
    const allGoals = await Goal.find({});
    return allGoals;
  } catch (error) {
    return error;
  }
};

const deleteGoal = async (goalId) => {
  try {
    const deleted = await Goal.findByIdAndDelete(goalId);
    return deleted;
  } catch (error) {
    return error;
  }
};

module.exports = { addGoalToDatabase, getAllGoals, deleteGoal };
