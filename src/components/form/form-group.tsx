import React, { ChangeEventHandler } from "react";
import TextInput, { inputComponentProps } from "../input";
import Typography from "../typography";
import Select, { selectComponentProps } from "../select";

type componentProps = {
  label: string;
  id: string;
  containerClassName?: string;
  inputClassName?: string;
  selectClassName?: string;
  inputPlaceholder?: string;
  useSelect?: boolean;
  value?: any;
  inputAgain?: boolean;
  name?: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  bgColor?: string;
};

export default function FormGroup({
  id,
  label,
  inputPlaceholder,
  options,
  useSelect,
  value,
  containerClassName,
  onChange,
  type,
  selectClassName,
  inputClassName,
  name,
  disabled,
  inputAgain = false,
  bgColor
}: componentProps & Partial<selectComponentProps> & inputComponentProps) {
  return (
    <div className={`${containerClassName}`}>
      <label className="" htmlFor={id}>
        <Typography
          variant="body2"
          className="!text-neutrals-5 !font-aeonik-pro-bold"
          label={label}
        />
      </label>
      {useSelect ? (
        <Select
          id={id}
          className={`${selectClassName} mt-[16px]`}
          options={options || []}
          name={name}
          onChange={onChange}
          value={value}
        />
      ) : (
        <TextInput
          value={value}
          onChange={onChange}
          type={type}
          placeholder={inputPlaceholder}
          className={!inputAgain ? `${inputClassName} mt-[16px]` : `${inputClassName} mt-[16px] border-[1px] border-[#AF6AFF]`}
          id={id}
          disabled={disabled}
          bgColor={bgColor}
        />
      )}
    </div>
  );
}
