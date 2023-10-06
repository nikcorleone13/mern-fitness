const FoodMethod = require('../database/foodMethods');

const addFoodToDatabase = async(req,res) =>{
    console.log("FOOD ADD");
    const foodObj = req.body;
    try {
      if (!foodObj.foodName || !foodObj.calories || !foodObj.protein || !foodObj.carbs || !foodObj.fat) {
        res.status(200).json({ message: "Invalid Body" });
      } else {
        const addedResult = await FoodMethod.addFoodToDatabase(foodObj);
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

  const getAllFood = async(req,res) =>{
    try {
        const allFood = await FoodMethod.getAllFood();
        if (allFood.length === 0) {
            res.status(200).json({message:"No exercise in database"});
        } else {
            console.log(allFood);
            res.status(200).json({message:"All Food",allFood});
        }
    } catch (error) {
        res.status(500),json({message:'Could not get and error is',error})
    }
}

const deleteFood = async(req,res) =>{
    const foodId = req.params.foodId;

    try {
        const deleted = await FoodMethod.deleteFood(foodId);
        if (deleted) {
            res.status(200).json({message:"Food Deleted",deleted});
            
        } else {
            res.status(404).json({message:"Unsuccessful. Not Found"});
        }
    } catch (error) {
        res.status(500),json({message:'Error.',error})
    }
}
  module.exports = {addFoodToDatabase,getAllFood,deleteFood}