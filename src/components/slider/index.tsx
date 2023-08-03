import React, { ChangeEventHandler, useState } from "react";
import Typography from "../typography";

type componentProps = {
  sliderValue: number;
  setSliderValue: (x?:any)=>void
  className: string;
};
export default function Slider({ 
  sliderValue,
  setSliderValue,
  className 
}: componentProps) {
  const [value, setValue] = useState(0);

  const handleChange = (e: any) => {
    setSliderValue(e.target.value);
  };
  return (
    <div className="flex items-center">
      <input
        onChange={handleChange}
        max={100}
        className={`${className}`}
        type="range"
      />

      <Typography
        variant="body1"
        className="!font-inter ml-[18px]"
        label={sliderValue.toString() + "%"}
      />
      <Typography />
    </div>
  );
}
