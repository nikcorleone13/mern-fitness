import axios from 'axios';

const baseURL = axios.create({
    baseURL: 'https://fitness-13bl.onrender.com/health/v1',
});
export const getAllFood = async() =>{
    try {
        const res = await baseURL.get('/api/food');
        const data = res?.data.allFood;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const addFoodAPI = async(addingFood) =>{
    console.log('obj to add',addingFood)
    const {foodName,calories,protein,carbs,fat} = addingFood
    try {
        const res = await baseURL.post('/api/food',{
            foodName:foodName,
            calories:calories,
            protein:protein,
            carbs:carbs,
            fat:fat
        })
        return res.data.addedResult;
    } catch (error) {
        console.error(error);
    }
}

export const deleteFoodAPI = async(foodId) =>{
    try {
        const res = await baseURL.delete(`/api/food/${foodId}`, {
            params: { foodId: foodId },
          });
          return res.data.deleted;
    } catch (error) {
        console.error(error);
    }
}