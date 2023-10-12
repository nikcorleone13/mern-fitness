export const healthReducer = (state, action) => {
  switch (action.type) {
    case "INITIAL_API_DATA": {
      return {
        ...state,
        exercise: [...action.payload.exercise],
        food: [...action.payload.food],
        goals: [...action.payload.goals],
      };
    }

    default:
      return state;
  }
};
