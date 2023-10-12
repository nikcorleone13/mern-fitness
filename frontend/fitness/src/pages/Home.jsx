import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/data/DataContext";
import Loader from "../components/Loader";
import { getAllExercise } from "../services/exer/exercise";
import { getAllFood } from "../services/food/food";
import { getAllGoals } from "../services/goal/goal";
import { PieChart, Pie, Sector, Cell, Legend } from "recharts";
import { HiFire } from "react-icons/hi/";
import { MdFastfood } from "react-icons/md";
import { BiTargetLock } from "react-icons/bi";
import { CgSandClock } from "react-icons/cg";

let chartData = [];
const COLORS = ["#23e854", "#f52a63"];

const setChartHandler = (done, target) => {
  chartData = [
    {
      name: "Burned",
      value: done,
    },
    {
      name: "Goal",
      value: target,
    },
  ];
};

const Home = () => {
  const [showData, setShowData] = useState({});
  const [loading, setLoading] = useState(false);
  const [caloriesDone, setCaloriesDone] = useState(0);
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [caloriesGoal, setCaloriesGoal] = useState(0);
  const [caloriesPending, setCaloriesPending] = useState(0);

  const setValuesHandler = (dataObj) => {
    const { exercise, food, goals } = dataObj;
    console.log("data", exercise, food, goals);

    let doneCal = 0;
    doneCal = exercise.reduce((curr, item) => curr + item.calories, 0);
    setCaloriesDone(doneCal);

    let foodCal= 0
    foodCal = food.reduce((curr, item) => curr + item.calories, 0);
    setCaloriesConsumed(foodCal);

    let goalCal = 0;
    if (goals) {
      goalCal = goals.reduce(
        (curr, item) => curr + parseInt(item.goalDescription),
        0
      );
      setCaloriesGoal(goalCal);
        
    }

    const pend = goalCal - doneCal + foodCal;
    if (pend >0) {
      setCaloriesPending(pend);
      setChartHandler(doneCal, pend);
      
    } else {
      setCaloriesPending(0);
      setChartHandler(doneCal, 0);
      
    }
  };
  // usestate
  useEffect(() => {

      setLoading(true);

      (async () => {
        try {
          // exercise get
          const exer = await getAllExercise();
          // 8food get
          const food = await getAllFood();
          // goals get
          const goals = await getAllGoals();
          const apiData = {
            exercise: exer,
            food: food,
            goals: goals.data.allGoals,
          };
          console.log(apiData);
          setShowData(apiData);
          setValuesHandler(apiData);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      })();
    },
 []);

  return (
    <div className="text-Primary ">
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="w-[70%]  mx-auto overflow-y-hidden py-8">
          <h1 className="text-2xl font-semibold ">Summary</h1>
          <div className="w-[90%] my-4 p-5 mx-auto flex items-center justify-between gap-10">
            <div>
              <PieChart width={400} height={400}>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={90}
                  outerRadius={130}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>

            <div className=" min-w-[45%] max-w-[100%] h-[100%] p-4">
              <div className=" flex flex-wrap gap-10 text-lg justify-between">
                <div className="w-[45%] flex flex-col items-center  ">
                  <p className="flex items-center gap-2">
                    Calories Burned
                    <span className="text-orange-400 ">
                      <HiFire size={25} />
                    </span>
                  </p>
                  <p className="text-center font-bold">{caloriesDone} kcal</p>
                </div>

                <div className="w-[45%] flex flex-col items-center  ">
                  <p className="flex items-center gap-2">
                    Calories Consumed
                    <span className="text-blue-500 ">
                      <MdFastfood size={25} />
                    </span>
                  </p>
                  <p className="text-center font-bold">
                    {caloriesConsumed} kcal
                  </p>
                </div>

                <div className="w-[45%] flex flex-col items-center  ">
                  <p className="flex items-center gap-2">
                    Calories Goal
                    <span className="text-red-600 ">
                      <BiTargetLock size={25} />
                    </span>
                  </p>
                  <p className="text-center font-bold">{caloriesGoal} kcal</p>
                </div>

                <div className="w-[45%] flex flex-col items-center  ">
                  <p className="flex items-center gap-2">
                    Calories Pending
                    <span className="text-green-500 ">
                      <CgSandClock size={25} />
                    </span>
                  </p>
                  <p className="text-center font-bold">
                    {caloriesPending} kcal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
