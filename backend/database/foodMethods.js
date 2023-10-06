const Food = require('./models/foodModel');

const addFoodToDatabase = async(foodObj) =>{
    try {
      const newFood = new Food({
        foodName: foodObj.foodName,
        calories: foodObj.calories,
        protein: foodObj.protein,
        carbs: foodObj.carbs,
        fat:foodObj.fat
      });
      const savedFood = await newFood.save();
      return savedFood;
    } catch (error) {
      return error;
    }
  };

  const getAllFood = async() =>{
    try {
        const allFood = await Food.find({});
        return allFood;
    } catch (error) {
        return error
    }
}

const deleteFood = async(foodId) =>{
    try {
        const deleted = await Food.findByIdAndDelete(foodId);
        console.log("DEL:",deleted);
        return deleted
    } catch (error) {
        return error
    }
}

module.exports = {addFoodToDatabase,getAllFood,deleteFood}