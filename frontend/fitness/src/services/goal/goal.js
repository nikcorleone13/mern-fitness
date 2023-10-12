import axios from 'axios';

const baseURL = axios.create({
    baseURL: 'https://fitness-13bl.onrender.com/health/v1',
});

// GET GOALS
export const getAllGoals = async() =>{
    try {
        const goal = await baseURL.get('/api/goals');
        return goal;
    } catch (error) {
        console.error(error);
    }
}

export const addGoalAPI = async(goalAdd) =>{
    console.log('obj to add',goalAdd)
    const {goalName,goalDescription,targetDate,status} = goalAdd
    try {
        const res = await baseURL.post('/api/goals',{
            goalName:goalName,
            goalDescription:goalDescription,
            targetDate:targetDate,
            status:status,
        })
        return res.data.addedResult;
    } catch (error) {
        console.error(error);
    }
}

export const deleteGoalAPI = async(goalId) =>{
    try {
        const res = await baseURL.delete(`/api/goals/${goalId}`, {
            params: { goalId: goalId },
          });
          return res.data.deleted;
    } catch (error) {
        console.error(error);
    }
}