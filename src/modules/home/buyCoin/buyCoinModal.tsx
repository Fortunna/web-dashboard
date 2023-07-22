import Modal from "@/components/modal";
import Typography from "@/components/typography";
import React, { ChangeEventHandler, useState } from "react";
import { Dai, Usdc, Usdt } from "@/components/icons";
import Select, { StylesConfig } from "react-select";
import SelectComponent from "@/components/customSelect";
import Image from "next/image";
import Button from "@/components/button";
import { components } from "react-select";

type componentProps = {
  onClose: () => void;
};
export default function BuyCoinModal({ onClose }: componentProps) {
  const header = [
    {
      title: "Deposit",
      subtitle: "Wallet Balance",
      key: "deposit",
    },
    {
      title: "Withdraw",
      subtitle: "Current Rewards",
      key: "withdraw",
    },
    {
      title: "Rewards",
      subtitle: "Wallet Balance",
      key: "reward",
    },
  ];

  const data = [
    {
      value: "1000 DAI",
      icon: <Dai />,
    },
    {
      value: "21 USDC",
      icon: <Usdc />,
    },
    {
      value: "29 USDT",
      icon: <Usdt />,
    },
  ];

  const [currentData, setCurrentData] = useState(header[0]);

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

  const TokenInput = ({ title, defaultValue }: any) => {
    return (
      <div className=" grid grid-cols-[auto_170px]  w-full border-[1px] border-[#2A2D3C] relative py-1 h-[80px] px-10  rounded-[8px]">
        <div>
          <Typography
            variant="body2"
            label={title}
            className="!font-poppins pt-4 !font-bold !text-white"
          />
          <input
            autoFocus
            className="!text-[25px]  w-full focus:border-none focus:outline-none  !font-poppins bg-transparent !text-[#888DAA]"
          />
        </div>

        <div className="flex items-center ">
          <div className="flex items-center h-full mr-5">
            <Typography
              className="!font-poppins-semi-bold !text-[#DE1EFD]"
              label="MAX"
            />
          </div>
          <div className="">
            <SelectComponent
              styles={colourStyles}
              components={{
                Option: CustomOption,
                Control: Control,
                SingleValue: CustomValue,
                DropdownIndicator: DropdownIndicator,
              }}
              defaultValue={defaultValue ?? {}}
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

  return (
    <div>
      <Modal
        hideClose={true}
        onClose={onClose}
        containerClass="px-6 py-6 relative overflow-hidden rounded-[4px] !bg-[#070714]"
        visible={true}
      >
        {/* <Select  fx/> */}
        <div className="flex justify-between items-center">
          <div
            className="!font-aeonik-pro !text-[40px] bg-clip-text"
            style={{
              background:
                "linear-gradient(152deg, #8C01FA 32.29%, #EB08A4 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            SWAP
          </div>

          <div>
            <svg
              width={24}
              height={24}
              onClick={onClose}
              viewBox="0 0 24 24"
              className="cursor-pointer"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 7L17 17"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 17L17 7"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="mt-8">
          <TokenInput
            defaultValue={{ label: "ETH", img: "/eth.png" }}
            title="From"
          />
        </div>

        <svg
          onClick={onClose}
          width={40}
          className="mx-auto my-8"
          height={40}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_792_77665)">
            <path
              d="M18 16L15 13L12 16"
              stroke="#DE1EFD"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 27V13"
              stroke="#DE1EFD"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 24L25 27L28 24"
              stroke="#DE1EFD"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M25 13V27"
              stroke="#DE1EFD"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <rect
            x="0.5"
            y="0.5"
            width={39}
            height={39}
            rx="19.5"
            stroke="url(#paint0_linear_792_77665)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_792_77665"
              x1="-3.46999e-06"
              y1="-8.84613"
              x2="47.5304"
              y2="-1.41612"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.322917" stopColor="#8C01FA" />
              <stop offset={1} stopColor="#EB08A4" />
            </linearGradient>
            <clipPath id="clip0_792_77665">
              <rect
                width={24}
                height={24}
                fill="white"
                transform="translate(8 8)"
              />
            </clipPath>
          </defs>
        </svg>
        <TokenInput
          defaultValue={{ label: "FTN", img: "/ftn.png" }}
          title="To"
        />

        <div className="flex justify-between py-8 items-center">
          <div>
            <Typography
              variant="body1"
              className="text-white !font-poppins"
              label="Price"
            />
          </div>
          <div className="flex items-center ">
            <Typography
              variant="body1"
              className="text-white !font-poppins"
              label="0.0021672 ETH per 1INCH"
            />
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1001_7215)">
                <path
                  d="M10 8L7 5L4 8"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 19V5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 16L17 19L20 16"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17 5V19"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1001_7215">
                  <rect width={24} height={24} fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div>
          <Typography
            variant="body2"
            className="!text-secondary text-end !font-aeonik-pro-bold"
            label="View Analytic"
          />
        </div>

        <div className="py-8">
          <Button
            label="Connect Wallet"
            size="big"
            theme="harsh"
            className="w-full"
          />
        </div>

        <></>
      </Modal>
    </div>
  );
}
