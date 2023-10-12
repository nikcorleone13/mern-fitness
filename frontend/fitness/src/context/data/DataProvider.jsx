import React, { useEffect, useReducer, useState } from "react";
import { DataContext } from "./DataContext";
import { healthReducer } from "../../reducer/healthReducer";
import { getAllExercise } from "../../services/exer/exercise";
import { getAllFood } from "../../services/food/food";

const DataProvider = ({ children }) => {
  const [data, setData] = useState("");

  const allData = {
    exercise: [],
    food: [],
    goals: [],
  };

  // reducer
  const [state, dispatch] = useReducer(healthReducer, allData);
  return (
    <DataContext.Provider
      value={{ data: state, setData: setData, dispatch: dispatch }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
