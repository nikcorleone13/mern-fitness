import React, { useEffect, useState } from "react";
import { addFoodAPI, deleteFoodAPI, getAllFood } from "../services/food/food";
import { MdOutlineDeleteForever } from "react-icons/md";
import Loader from "../components/Loader";

const Food = () => {
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(false);
  const [foodObj,setFoodObj] = useState({
    foodName:'',
    calories:'',
    protein:'',
    carbs:'',
    fat:''
  })

  useEffect(() => {
    getAllFood()
      .then((data) => {
        setFood(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleDeleteFood = (foodId) => {
    console.log('id',foodId);
    deleteFoodAPI(foodId).then((res) =>{
      console.log('res',res);
      const foo = food.filter((item) => item._id !== res._id);
      setFood([...foo])
    }).catch((e) =>{
      console.error(e);
    })
  };

  const handleAddFood = (addObj) =>{
    console.log('add',addObj);
    addFoodAPI(addObj).then((res) =>{
      console.log('resp',res);
      setFood((prev) =>[...(prev|| []),res])
    }).catch((e) =>{
      console.error(e);
    })
  }
  return (
    <div className=" w-screen p-6 text-Primary">
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="w-full pl-12 py-6 ">
          <div className="text-3xl font-semibold my-4">Food</div>

          <div className="mt-10 w-[80%] flex gap-8 justify-between ">
            <input
              placeholder="Enter Food"
              className="border-Primary border-2 w-[20%] p-2 rounded-md focus:outline-none"
              onChange={(e)  => setFoodObj((prev) =>({...prev, foodName:e.target.value}))}
            />
            <input
              placeholder="Enter Calories"
              className="border-Primary border-2 w-[20%]  p-2 rounded-md focus:outline-none"
              onChange={(e)  => setFoodObj((prev) =>({...prev, calories:e.target.value}))}
            />
            <input
              placeholder="Enter protein"
              className="border-Primary border-2 w-[20%] p-2 rounded-md focus:outline-none"
              onChange={(e)  => setFoodObj((prev) =>({...prev, protein:e.target.value}))}
            />
            <input
              placeholder="Enter carbs"
              className="border-Primary border-2 w-[20%] p-2 rounded-md focus:outline-none"
              onChange={(e)  => setFoodObj((prev) =>({...prev, carbs:e.target.value}))}
            />
            <input
              placeholder="Enter fat"
              className="border-Primary border-2 w-[20%] p-2 rounded-md focus:outline-none"
              onChange={(e)  => setFoodObj((prev) =>({...prev, fat:e.target.value}))}
            />
            <button className="border-none px-6 rounded-md bg-Primary text-white w-[20%]" onClick={() => handleAddFood(foodObj)}>
              Add Food
            </button>
          </div>

          {/* exercise info */}
          <div className="mt-16 flex gap-6 flex-wrap-reverse">
            {
              food && food.length>0 ?(
                <div>
            {food.map((item) => {
              return (
                <div
                  key={item._id}
                  className="border-2 w-[250px] my-6 p-3 rounded-md capitalize relative shadow-lg"
                >
                  <p>
                    <MdOutlineDeleteForever
                      className="absolute right-5 cursor-pointer text-red-600 "
                      size={25}
                      onClick={() => handleDeleteFood(item._id)}
                    />
                  </p>

                  <p>Name:- {item.foodName}</p>
                  <p>Calories:- {item.calories} kcal</p>
                  <p>Protein:- {item.protein} g</p>
                  <p>Carbohydrate:- {item.carbs} g</p>
                </div>
              );
            })}
                </div>
              ):(
                <div>
                  No food.Add some 
                </div>
              )
            }

          </div>
        </div>
      )}
    </div>
  );
};

export default Food;
