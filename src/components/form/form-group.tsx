import React, { ChangeEventHandler } from "react";
import TextInput from "../input";
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
  onChange?: ChangeEventHandler<HTMLInputElement>;
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
  selectClassName,
  inputClassName,
}: componentProps & Partial<selectComponentProps>) {
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
        />
      ) : (
        <TextInput
          value={value}
          onChange={onChange}
          placeholder={inputPlaceholder}
          className={`${inputClassName} mt-[16px]`}
          id={id}
        />
      )}
    </div>
  );
}
