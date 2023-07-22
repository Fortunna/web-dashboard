import React from "react";
import Select, {
  ActionMeta,
  components,
  OnChangeValue,
  Props,
  StylesConfig,
} from "react-select";
import CreatableSelect, { CreatableProps } from "react-select/creatable";
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";

type MultiTextInputType = {
  bg?: string;
  size?: string;
  placeholder?: string;
  errorMessage?: React.ReactNode | string;
  value?: any;
  setValues: Function;
  inputValue: string;
  setInputValue: Function;
  disabled?: boolean;
  name?: string;
  required?: boolean;
  className?: any;
  options?: any;
  isDisabled?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
};

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg
        width="14"
        height="10"
        viewBox="0 0 14 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.828061 2.42461L6.28822 8.79649C6.37623 8.89914 6.4854 8.98154 6.60825 9.03803C6.7311 9.09452 6.86472 9.12377 6.99994 9.12377C7.13515 9.12377 7.26877 9.09452 7.39162 9.03803C7.51447 8.98154 7.62364 8.89914 7.71166 8.79649L13.1718 2.42461C13.6929 1.81641 13.2609 0.876953 12.4601 0.876953H1.53822C0.737436 0.876953 0.305405 1.81641 0.828061 2.42461Z"
          fill="#90A0C2"
        />
      </svg>
    </components.DropdownIndicator>
  );
};

const MultiValueRemove = (props: any) => {
  return (
    <components.MultiValueRemove {...props}>
      <svg
        width="13"
        height="14"
        viewBox="0 0 13 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.18278 5.31641L4.81543 8.68376"
          stroke="#000E29"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.18364 8.68532L4.81348 5.31445"
          stroke="#000E29"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="6.5" cy="7" r="6" stroke="#000E29" />
      </svg>
    </components.MultiValueRemove>
  );
};

const MenuWithFooter = ({ footerComponent, children, ...props }: any) => (
  <components.Menu {...props}>
    {children}
    {footerComponent ? <div>{footerComponent}</div> : null}
  </components.Menu>
);

const customStyles = {
  option: (provided: string, state: string) => ({
    // ...provided,
    // borderBottom: '1px dotted pink',
    // color: state.isSelected ? 'red' : 'blue',
    // padding: 20,
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    // width: 200,
    borderColor: "red",
  }),
  singleValue: (provided: string, state: string) => {
    // const opacity = state.isDisabled ? 0.5 : 1;
    // const transition = 'opacity 300ms';
    // return { ...provided, opacity, transition };
  },
};

export interface SelectComponentType extends Partial<MultiTextInputType> {
  data?: Array<any>;
  components?: {};
  showDropdownIndicator?: boolean;
  footerComponent?: React.ReactNode;
  defaultValue: any;
  styles?: StylesConfig<any, any, any>;
  onChange?: Function | any;
}

const SelectComponent = React.forwardRef(
  (
    {
      data = [],
      components = {},
      bg = "white",
      size = "default",
      placeholder = "",
      errorMessage,
      defaultValue,
      required,
      footerComponent,
      showDropdownIndicator = true,
      styles,
      isDisabled = false,
      disabled,
      name,
      onChange,
      ...rest
    }: SelectComponentType,
    ref
  ) => {
    return (
      <>
        <Select
          //@ts-ignore
          ref={ref}
          placeholder={placeholder}
          components={{
            DropdownIndicator,
            MultiValueRemove,
            Menu: (props) => (
              <MenuWithFooter footerComponent={footerComponent} {...props} />
            ),
            ...components,
          }}
          classNamePrefix="custom_select"
          className={`custom-select custom-size-${size} custom-select-bg-${bg}`}
          options={data}
          onChange={onChange}
          defaultValue={defaultValue}
          name={name}
          required={required}
          styles={{
            multiValueRemove: (base) => ({
              ...base,
              ":hover": {
                backgroundColor: "transparent",
              },
            }),
            multiValue: (base) => ({
              ...base,
              backgroundColor: "#F5F6FA",
              borderRadius: "4px",
              padding: "2px",
            }),
            multiValueLabel: (base) => ({
              ...base,
              color: "#647AA8",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }),

            ...styles,
          }}
          isDisabled={isDisabled || disabled}
          {...rest}
        />
      </>
    );
  }
);

SelectComponent.displayName = "SelectComponent";

export const MultiTextInput = ({
  bg = "white",
  size = "default",
  placeholder = "",
  errorMessage,
  value,
  setValues,
  inputValue,
  setInputValue,
  onBlur,
  ...rest
}: MultiTextInputType) => {
  const createOption = (label: string) => ({
    label,
    value: label,
  });

  const handleKeyDown = (event: React.ChangeEvent<{}> & { key?: string }) => {
    if (!inputValue) return;
    switch (event?.key) {
      case "Enter":
      case "Tab":
        setValues((prev: []) => [...prev, createOption(inputValue)]);
        setInputValue("");
        event.preventDefault();
    }
  };

  return (
    <>
      <CreatableSelect
        components={{ DropdownIndicator: () => null, MultiValueRemove }}
        inputValue={inputValue}
        isMulti={true}
        styles={{
          multiValueRemove: (base) => ({
            ...base,
            ":hover": {
              backgroundColor: "transparent",
            },
          }),
          multiValue: (base) => ({
            ...base,
            backgroundColor: "#F5F6FA",
            borderRadius: "4px",
            padding: "2px",
          }),
          placeholder: (base) => ({
            ...base,
            fontSize: "14px",
            color: "#647AA8",
          }),

          indicatorsContainer: (base) => ({
            ...base,
            display: "none",
          }),
          valueContainer: (base) => ({
            ...base,
            padding: "8px 16px",
          }),

          input: (base) => ({
            ...base,
            fontSize: "14px",
          }),

          multiValueLabel: (base) => ({
            ...base,
            color: "#647AA8",
            fontWeight: 600,
          }),
        }}
        onChange={(newValue) => setValues(newValue)}
        onInputChange={(newValue) => setInputValue(newValue)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        value={value}
        menuIsOpen={false}
        onBlur={onBlur}
        className={`custom-select custom-size-lg custom-select-bg-${bg}`}
        {...rest}
      />
    </>
  );
};

MultiTextInput.displayName = "MultiTextInput";

export default SelectComponent;
