import React, { useState } from "react";
import { MutatingDots } from "react-loader-spinner";

const Loader = () => {
  const [time, setTime] = useState(false);
  setTimeout(() => {
    setTime(true);
  }, 2500);
  return (
    <div className="absolute top-0 left-0 w-screen h-screen overflow-x-hidden flex justify-center items-center bg-primary flex-col z-[9999] text-Primary ">
      <MutatingDots
        height="150"
        width="150"
        color="#2bcf65"
        secondaryColor="#99e8b5"
        radius="15.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      <h1 className="text-2xl text-Secondary  ">Loading....</h1>
      {time && <h1 className="text-2xl text-Secondary mt-6 ">Hang on just a bit</h1>}
    </div>
  );
};

export default Loader;
