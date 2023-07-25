import React, { useState } from "react";

const RangeInputWithSteps = ({ steps = 5 }: { steps: number }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <div className="relative">
      <input
        type="range"
        min="0" // Set the minimum value
        max="100" // Set the maximum value
        step={100 / (steps - 1)} // Set the step value (e.g., 10)
        value={value}
        onChange={handleChange}
      />
      <div
        className="absolute w-full top-[50%] flex justify-between"
        style={{ transform: "translateY(-50%)" }}
      >
        {Array.from({ length: steps }).map((value, i) => {
          if (value == 100 / i) {
            return <div key={i}></div>;
          }
          return (
            <svg
              key={i}
              width={2}
              onClick={() => {
                setValue(100 / (i + 1));
                console.log(100 / (i + 1) / 2);
              }}
              height={10}
              className="cursor-pointer"
              viewBox="0 0 2 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width={2} height={6} rx={1} fill="#777E91" />
            </svg>
          );
        })}
      </div>
    </div>
  );
};

export default RangeInputWithSteps;
