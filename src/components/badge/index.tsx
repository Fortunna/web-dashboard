import classNames from "classnames";
import React from "react";

type componentProps = {
  theme?: "success" | "errorLight";
  label: string;
  className?: string;
  outline?: boolean;
  rightComponent?: React.ReactNode;
};
export default function Badge({
  theme = "success",
  label,
  rightComponent,
  className,
  outline,
}: componentProps) {
  const themeStyles = classNames({
    "bg-success text-[#F7F9FD] ": theme == "success" && !outline,
    "!border-[#2EBE7B] border-[1px] text-[#2EBE7B]":
      theme == "success" && outline,
    "bg-transparent-error text-danger ": theme == "errorLight",
  });
  return (
    <span
      className={`font-inter px-3 py-[1px] flex items-center  rounded-full text-caption-0.5 ${className} ${themeStyles} `}
    >
      {label}
      {rightComponent}
    </span>
  );
}
