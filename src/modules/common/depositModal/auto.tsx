import Modal from "@/components/modal";
import React, { useState } from "react";
import Image from "next/image";
import Typography from "@/components/typography";
import TextInput from "@/components/input";
import Slider from "@/components/slider";
import Button from "@/components/button";
import SelectComponent from "@/components/customSelect";
import { components } from "react-select";
import Select, { StylesConfig } from "react-select";

type componentProps = {
  imgSrc: string;
  name: string;
  balance: number;
};

const colourStyles: StylesConfig<any> = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
    borderColor: "#222531",

    width: "150px",
    borderRadius: "8px",
    ":hover": {
      borderColor: "#222531",
    },
    ":focus": {
      borderColor: "#222531",
    },
  }),

  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = "";
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : undefined,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? ""
          ? "white"
          : "black"
        : data.color,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
      },
    };
  },
  input: (styles) => ({
    ...styles,
    height: "50px",
    // fontSize: "34px",
    fontFamily: "Poppins",
    color: "#888DAA",
  }),
  placeholder: (styles) => ({ ...styles }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "#fff",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: "bold",
  }),
};

const Control = ({ children, ...props }: any) => {
  return (
    <components.Control {...props}>
      {props?.selectProps?.value?.image && (
        <Image
          alt=""
          width={25}
          height={25}
          src={props.selectProps.value.image}
        />
      )}{" "}
      {children}
    </components.Control>
  );
};
const CustomOption = ({ innerProps, label, data }: any) => {
  console.log(data, "kskks");
  return (
    <div
      {...innerProps}
      className="flex px-4 py-3 items-center whitespace-nowrap"
    >
      <Image
        src={data.img}
        alt="Option"
        width={30}
        height={30}
        className="mr-4"
      />
      {label}
    </div>
  );
};

const CustomValue = (props: any) => (
  <components.SingleValue className="d-flex align-items-center" {...props}>
    <div className="flex items-center">
      <Image
        src={props?.data.img}
        alt="Option"
        width={30}
        height={30}
        className="mr-4"
      />
      <Typography
        label={props?.data.label}
        variant="body2"
        className="!text-white"
      />
    </div>
  </components.SingleValue>
);

const DropdownIndicator = (props: any) => {
  return (
    <div {...props}>
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 9.99997L12 14L16 9.99997"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

const SingleCoinOption = ({ imgSrc, name, balance }: componentProps) => {
  return (
    <div className="border-[1px] border-[#2A2D3C] py-6 px-4 rounded-[16px]">
      <div className="grid grid-cols-[40%_auto]">
        <div className=" items-center">
          {/* <div style={{ width: "46px", height: "46px" }}>
            <Image src={imgSrc} width={46} height={46} alt="Img" />
          </div> */}

          <div>
            <div className="">
              <div className="flex items-center">
                <Typography
                  variant="body2"
                  className="!font-poppins !text-white"
                  label={"Amount"}
                />
              </div>
            </div>
            <Typography
              label="0.001588"
              className="!font-poppins !text-[#888DAA] !text-[33px]"
            />
            <Typography />
          </div>
        </div>

        <div className=" flex items-center justify-end">
          <Typography
            variant="body2"
            className="!font-poppins-semi-bold ml-[10px] pr-[14px] !text-secondary !font-bold"
            label="MAX"
          />

          {/* <div className="border-[1px] flex items-center  py-3 px-4 rounded-[12px] border-[#222531]">
            <div style={{ width: "36px", height: "36px" }} className="mr-3">
              <Image src={imgSrc} width={36} height={36} alt="Img" />
            </div>
            <Typography
              variant="body2"
              className="!font-poppins"
              label={name}
            />
          </div> */}
          <SelectComponent
            styles={colourStyles}
            components={{
              Option: CustomOption,
              Control: Control,
              SingleValue: CustomValue,
              DropdownIndicator: DropdownIndicator,
            }}
            defaultValue={{ label: "ETH", value: "ETH", img: "/eth.png" } ?? {}}
            data={[
              { label: "ETH", value: "ETH", img: "/eth.png" },
              { label: "FTN", value: "FTN", img: "/ftn.png" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default function Auto() {
  const [activeRiskFactor, setActiveRiskFactor] = useState("");

  const isActiveStyles = (label: string) => {
    const isActive = label === activeRiskFactor;

    if (isActive) {
      return "!border-secondary !text-secondary ";
    }
    return "";
  };
  return (
    <div>
      <>
        <div className="">
          <Typography
            label="Risk Factor"
            variant="body3"
            className="!font-poppins "
          />

          <div className="grid grid-cols-3 gap-2 my-4">
            <Button
              onClick={() => setActiveRiskFactor("25%")}
              className={`hover:border-secondary transition-all  ${isActiveStyles(
                "25%"
              )}`}
              theme="transparent"
              label="25%"
            />
            <Button
              onClick={() => setActiveRiskFactor("50%")}
              className={`hover:border-secondary transition-all  ${isActiveStyles(
                "50%"
              )}`}
              theme="transparent"
              label="50%"
            />
            <Button
              onClick={() => setActiveRiskFactor("75%")}
              className={`hover:border-secondary transition-all  ${isActiveStyles(
                "75%"
              )}`}
              theme="transparent"
              label="75%"
            />
          </div>
          <div className="mb-4">
            <Typography
              variant="body2"
              className="!font-poppins !text-secondary !text-center  border-[1px] border-[#334155] rounded-[8px] px-[17px] py-5"
            >
              <>The ORACLE is under development</>

              {/* <svg
                  className="inline-block ms-2"
                  width={15}
                  height={15}
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.473 11.974H3.30632V3.80729H7.38965V2.64062H3.30632C2.65882 2.64062 2.13965 3.16562 2.13965 3.80729V11.974C2.13965 12.6156 2.65882 13.1406 3.30632 13.1406H11.473C12.1146 13.1406 12.6396 12.6156 12.6396 11.974V7.89062H11.473V11.974ZM8.55631 2.64062V3.80729H10.6505L4.91632 9.54146L5.73882 10.364L11.473 4.62979V6.72396H12.6396V2.64062H8.55631Z"
                    fill="#94A3B8"
                  />
                </svg> */}
            </Typography>
          </div>
          <SingleCoinOption name="DAI" imgSrc="/dai.png" balance={200} />
          <div className="mt-5"></div>
          <div className="flex items-center py-2 justify-between">
            <Typography
              variant="body2"
              className="!font-poppins !text-[#ABAFC4]"
              label="Send Amount"
            />
            <Typography
              variant="body2"
              className="!font-poppins !text-[#ABAFC4]"
              label="0 BNB"
            />
          </div>
          <div className="flex items-center py-2 justify-between">
            <Typography
              variant="body2"
              className="!font-poppins !text-[#ABAFC4]"
              label="Transaction Fee"
            />
            <Typography
              variant="body2"
              className="!font-poppins !text-[#ABAFC4]"
              label="0.004871 BNB"
            />
          </div>
          <div className="flex items-center py-2 justify-between">
            <Typography
              variant="body3"
              className="!font-poppins"
              label="New Total"
            />
            <div>
              <Typography
                variant="body3"
                className="!font-poppins"
                label="0.004871 BNB"
              />
              <Typography
                className="text-end !text-[#ABAFC4] !font-poppins"
                variant="body0.5"
                label="$6.78"
              />
            </div>
          </div>

          <div className="mt-[24px]"></div>

          <Button size="big" className="w-full" theme="harsh" label="Deposit" />
          <div className="mt-[40px]"></div>
        </div>
      </>
    </div>
  );
}
