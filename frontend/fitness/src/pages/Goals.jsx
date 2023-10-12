import React, { useEffect, useState } from "react";
import { addGoalAPI, deleteGoalAPI, getAllGoals } from "../services/goal/goal";
import moment from "moment";
import Loader from "../components/Loader";
import { MdOutlineDeleteForever } from "react-icons/md";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [goalObj, setGoalObj] = useState({
    goalName: "",
    goalDescription: "",
    targetDate: "",
    status: "",
  });

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    setLoading(true);
    getAllGoals()
      .then((data) => {
        if (data.data.allGoals?.length >= 1) {
          setGoals(data.data.allGoals || []);
        } else {
          setGoals([]);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleDeleteGoal = (goalId) => {
    console.log("id", goalId);
    deleteGoalAPI(goalId)
      .then((res) => {
        console.log("res", res);
        const go = goals.filter((item) => item._id !== res._id);
        setGoals([...go]);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleAddGoal = (addObj) => {
    console.log("add", addObj);
    addGoalAPI(addObj)
      .then((res) => {
        console.log("resp", res);
        setGoals((prev) => [...(prev||[]), res]);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  console.log('goals',goals)
  return (
    <div className=" w-screen p-6 text-Primary">
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="w-full pl-12 py-6 ">
          <div className="text-3xl font-semibold my-4">Goals</div>

          <div className="mt-10 w-[80%] flex gap-8 justify-between ">
            <input
              placeholder="Goal Name"
              className="border-Primary border-2 w-[20%] p-2 rounded-md focus:outline-none"
              onChange={(e) =>
                setGoalObj((prev) => ({ ...prev, goalName: e.target.value }))
              }
            />
            <input
              placeholder="Goal Target(calories)"
              className="border-Primary border-2 w-[20%]  p-2 rounded-md focus:outline-none"
              onChange={(e) =>
                setGoalObj((prev) => ({
                  ...prev,
                  goalDescription: e.target.value,
                }))
              }
            />
            <input
              placeholder="Target Date"
              type="date"
              id="start"
              name="trip-start"
              value={today}
              min={today}
              max="2025-12-31"
              className="border-Primary border-2 w-[20%] p-2 rounded-md focus:outline-none"
              onChange={(e) =>
                setGoalObj((prev) => ({ ...prev, targetDate: e.target.value }))
              }
            />
            <input
              placeholder="Status"
              className="border-Primary border-2 w-[20%] p-2 rounded-md focus:outline-none"
              onChange={(e) =>
                setGoalObj((prev) => ({ ...prev, status: e.target.value }))
              }
            />
            <button
              className="border-none px-6 rounded-md bg-Primary text-white w-[20%]"
              onClick={() => handleAddGoal(goalObj)}
            >
              Add Goal
            </button>
          </div>

          {/* exercise info */}
          <div className="mt-16 flex gap-6 flex-wrap-reverse">
          {goals && goals.length > 0 ? (
           <div>
              {
                goals.map((item) => {
                  const date = moment(item.targetDate).utc().format("YYYY-MM-DD");
                  return (
                    <div
                      key={item._id}
                      className="border-2 w-[250px] my-6 p-3 rounded-md capitalize relative shadow-lg"
                    >
                      <p>
                        <MdOutlineDeleteForever
                          className="absolute right-5 cursor-pointer text-red-600 "
                          size={25}
                          onClick={() => handleDeleteGoal(item._id)}
                        />
                      </p>
                      <p>Goal:- {item.goalName}</p>
                      <p>Target:- {item.goalDescription} kcal</p>
                      <p>Target Date:-{date}</p>
                      <p>Carbohydrate:- {item.carbs} g</p>
                    </div>
                  );
                })
              
            }
            </div>
            ) :
            (
            <div>
              No goals available
            </div>
          )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Goals;
