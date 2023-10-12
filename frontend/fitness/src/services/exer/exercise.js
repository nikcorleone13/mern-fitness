import axios from "axios";

const baseURL = axios.create({
  baseURL: "https://fitness-13bl.onrender.com/health/v1",
});

export const getAllExercise = async () => {
  try {
    const response = await baseURL.get("/api/exercise");
    return response.data.allExercise;
  } catch (error) {
    console.error(error);
  }
};

export const addExercise = async (exerciseObj) => {
  const { exerciseName, exerciseDuration } = exerciseObj;
  try {
    const response = await baseURL.post("/api/exercise", {
      exerciseName: exerciseName,
      exerciseDuration: exerciseDuration,
    });
    return response.data.addedResult;
  } catch (error) {
    console.error(error);
  }
};

export const deleteExercise = async (exerId) => {
    console.log('api id',exerId);
  try {
    const response = await baseURL.delete(`/api/exercise/${exerId}`, {
      params: { exerciseId: exerId },
    });
    console.log("delete", response);
    return response.data.deleted;
  } catch (error) {}
};
