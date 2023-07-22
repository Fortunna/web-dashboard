import classNames from "classnames";
import React from "react";

type componentProps = {
  outline?: boolean;
  theme?:
    | "white"
    | "secondary"
    | "secondary-solid"
    | "dark"
    | "harsh"
    | "transparent";
  label: string;
  rightComponent?: React.JSX.Element;
  leftComponent?: React.JSX.Element;
  rounded?: boolean;
  className?: string;
  disabled?: boolean;
  size?: "default" | "small" | "big";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
export default function Button({
  outline = false,
  label,
  className,
  disabled,
  rightComponent,
  leftComponent,
  rounded = false,
  size = "default",
  onClick,
  theme = "white",
}: componentProps) {
  const classRoundedStyles = classNames({
    "rounded-full": rounded,
    "rounded-[6px]": !rounded,
  });

  const themeStyles = classNames({
    "bg-white text-dark": theme == "white" && !outline,
    "border-2 text-light-4 border-light-white": theme == "white" && outline,
    "text-[#4C516B] bg-[#222531]": theme == "harsh" && !outline,
    "bg-secondary-gradient text-white border-[1px]  border-black":
      theme == "secondary" && !outline,
    "bg-[#DE1EFD] text-white border-[1px]  border-black":
      theme == "secondary-solid" && !outline,
    "border-[#AC6AFF] text-white border-[3px]": theme == "secondary" && outline,
    "border-neutrals-6 bg-#212531 text-white border-[1px]": theme == "dark",
    "border-transparent-3 text-white border-[1px] bg-[rgba(255, 255, 255, 0.05)]":
      theme == "transparent",
  });

  const sizeStyles = classNames({
    "md:px-[16px] md:py-[11px]  py-[8px] px-[12px]   md:text-[14px] text-[12px]":
      size == "default",
    "px-[15px] py-[10px] text-[12px]": size == "small",
    "px-[16px] h-[54px] text-caption-3": size == "big",
  });

  const disabledStyles = classNames({
    "opacity-[0.6]": disabled,
  });
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
      
      flex items-center justify-center
    
      font-aeonik-pro
       
      ${className}
      ${themeStyles}
      ${sizeStyles}
      ${disabledStyles}
      ${classRoundedStyles}
    `}
    >
      {leftComponent}
      {label}
      {rightComponent}
    </button>
  );
}
