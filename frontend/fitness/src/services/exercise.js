import axios from 'axios';

// const baseURL = axios.create({baseURL:'https://fitness-13bl.onrender.com/health/v1'}) 
export const getAllExercise = async() =>{
    try {
        const allExercise = await axios.get('http://192.168.1.9:9000/health/v1/api/exercise').then((res) =>{
            console.log(res);
        });
    } catch (error) {
        console.error(error)
    }
}

export const addExercise = async() =>{

}

export const deleteExercise = async() =>{

}