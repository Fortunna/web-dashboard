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
import CheckBox from "@/components/checkbox";

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

const reward = [
  {
    name: "Curve3Pool",
    img: ["/dai.png", "/usdt.png", "/usdc.png"],
  },
  {
    name: "ETH/DAI",
    img: ["/eth.png", "/dai.png"],
  },
  {
    name: "BNB/BTC",
    img: ["/binance.png", "/btc.png"],
  },
  {
    name: "BNB/ETH",
    img: ["/binance.png", "/eth.png"],
  },
  {
    img: ["/eth.png", "/usdc.png"],
    name: "ETH/USDC",
  },
  {
    name: "ETH/USDT",
    img: ["/eth.png", "/usdt.png"],
  },
];
export default function Manual() {
  const [selectedRewards, setSelectedRewards] = useState<string[]>([]);

  return (
    <div>
      <>
        <div className="">
          <Typography
            variant="body3"
            className="!font-inter mb-3"
            label="My Pools"
          />
          {/* <RangeInputWithSteps /> */}
          <div className="border-[1px] border-[#2A2D3C] py-6 px-4 mb-4 rounded-[16px]">
            {reward.map((reward, index) => {
              return (
                <div
                  onClick={() => {
                    const present = selectedRewards.includes(reward.name);
                    if (present) {
                      const _data = selectedRewards.filter(
                        (c) => c !== reward.name
                      );
                      setSelectedRewards(_data);
                    } else {
                      setSelectedRewards((prev) => [...prev, reward.name]);
                    }
                  }}
                  className="flex items- justify-between"
                  key={index}
                >
                  <div className="flex items-center overflow-hidden ">
                    <div className="flex items-center">
                      <CheckBox
                        checked={selectedRewards.includes(reward.name)}
                        id={index.toString()}
                      />
                      <label
                        htmlFor={index.toString()}
                        className="flex items-center ms-2"
                      >
                        <div className="flex items-center">
                          {reward.img.map((_img, _index) => {
                            return (
                              <Image
                                key={_index}
                                height={30}
                                className={`ms-3 mr-2 ${
                                  _index ? "!-ms-4" : ""
                                }`}
                                width={30}
                                src={_img}
                                alt="img"
                              />
                            );
                          })}
                        </div>

                        <Typography
                          variant="body2"
                          className="!font-inter py-3"
                          label={reward.name}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              );
            })}
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
