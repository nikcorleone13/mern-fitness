const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseControllers') 
const foodController = require('../controllers/foodController')
const goalController = require("../controllers/goalControllers");

// GET
router.get("/api/exercise",exerciseController.getAllExercise);
router.get("/api/food",foodController.getAllFood);
router.get("/api/goals",goalController.getAllGoals);

// POST
router.post("/api/exercise",exerciseController.addExerciseToData);
router.post("/api/food",foodController.addFoodToDatabase);
router.post("/api/goals",goalController.addGoalToDatabase);

// PATCH

// DELETE
router.delete("/api/exercise/:exerciseId",exerciseController.deleteExercise);
router.delete("/api/food/:foodId",foodController.deleteFood);
router.delete("/api/goals/:goalId",goalController.deleteGoal);

module.exports = router;