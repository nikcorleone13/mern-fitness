import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/data/DataContext";
import {
  addExercise,
  deleteExercise,
  getAllExercise,
} from "../services/exer/exercise";
import Loader from "../components/Loader";
import { MdOutlineDeleteForever } from "react-icons/md";

const Exercise = () => {
  const [exercise, setExercise] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exerObj, setExerObj] = useState({
    exerciseName: "",
    exerciseDuration: "",
  });

  useEffect(() => {
    setLoading(true);
    getAllExercise()
      .then((data) => {
        setExercise(data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const handleAddExercise = (exerciseObj) => {
    addExercise(exerciseObj)
      .then((res) => {
        setExercise((prev) => [...(prev || []), res]);      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteExercise = async (objId) => {
    deleteExercise(objId)
      .then((res) => {
        const ex = exercise.filter((item) => item._id !== res._id);
        console.log("fil", ex);
        setExercise([...ex]);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <div className=" w-screen p-6 text-Primary">
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className=" px-12 py-6 ">
          <div className="text-3xl font-semibold my-4">Exercise</div>

          <div className=" mt-10 w-[70%] flex gap-8 justify-between ">
            <input
              onChange={(e) =>
                setExerObj((prevExerObj) => ({
                  ...prevExerObj,
                  exerciseName: e.target.value,
                }))
              }
              placeholder="Enter exercise"
              className="border-Primary border-2 w-[30%] p-2 rounded-md focus:outline-none  "
            />
            <input
              onChange={(e) =>
                setExerObj((prevExerObj) => ({
                  ...prevExerObj,
                  exerciseDuration: e.target.value,
                }))
              }
              placeholder="Duration (minutes)"
              className="border-Primary border-2 w-[30%]  p-2 rounded-md focus:outline-none   "
            />
            <button
              className="border-none px-6 rounded-md bg-Primary text-white"
              onClick={() => handleAddExercise(exerObj)}
            >
              Add Exercise
            </button>
          </div>

          {/* exercise info */}
          <div className="mt-16 flex gap-6 flex-wrap-reverse">
            {exercise && exercise.length > 0 ? (
              <>
                {exercise.map((item) => {
                  return (
                    <div
                      key={item._id}
                      className="border-2 w-[250px] my-6 p-3 rounded-md capitalize relative shadow-lg"
                    >
                      <p>
                        <MdOutlineDeleteForever
                          className="absolute right-5 cursor-pointer text-red-600 "
                          size={25}
                          onClick={() => handleDeleteExercise(item._id)}
                        />
                      </p>
                      <p>Name:- {item.exerciseName}</p>
                      <p>Burned:- {item.calories} kcal</p>
                      <p>Duration:- {item.exerciseDuration} kcal</p>
                    </div>
                  );
                })}
              </>
            ) : (
              <div>No exercise Data</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Exercise;
