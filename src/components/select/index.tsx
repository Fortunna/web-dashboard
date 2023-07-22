import classNames from "classnames";
import React from "react";

export type selectComponentProps = {
  options: {
    title: string;
  }[];
  theme?: "default";
  id: string;
  placeholder?: string;
  className?: string;
  value?: string;
  name?: string;
};
export default function Select({
  options,
  className,
  theme = "default",
  name,
}: selectComponentProps) {
  const bgStyles = classNames({
    "bg-transparent-deep text-light-white border-transparent-1":
      theme == "default",
  });

  return (
    <select
      style={{ backgroundPosition: "99% , center" }}
      name = {name}
      className={`${bgStyles} ${className} bg-[url('/arrow-down.svg')] bg-no-repeat  appearance-none  px-[16px] py-[8px] text-caption-2  rounded h-[40px] border-[1px]`}
    >
      {options.map((option, index) => {
        return (
          <option className="" key={index} value={index}>
            {option.title}
          </option>
        );
      })}
    </select>
  );
}
