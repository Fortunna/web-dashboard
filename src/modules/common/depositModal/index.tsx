import Modal from "@/components/modal";
import React, { useState } from "react";
import Image from "next/image";
import Typography from "@/components/typography";
import TextInput from "@/components/input";
import Slider from "@/components/slider";
import Button from "@/components/button";
import Auto from "./auto";
import Manual from "./manual";

type componentProps = {
  imgSrc: string;
  name: string;
  balance: number;
};

const SingleCoinOption = ({ imgSrc, name, balance }: componentProps) => {
  const [value, setValue] = useState<number>(0);

  return (
    <div className="border-[1px] border-[#2A2D3C] py-6 px-4 rounded-[16px]">
      <div className="grid grid-cols-[40%_auto]">
        <div className="flex items-center">
          <div style={{ width: "46px", height: "46px" }}>
            <Image src={imgSrc} width={46} height={46} alt="Img" />
          </div>

          <div className="ms-4">
            <Typography
              className="!text-[20px] !font-inter !font-bold"
              label={name}
            />
            <div className="flex items-center">
              <Typography
                variant="body1"
                className="!font-poppins"
                label={"Balance:"}
              />
              <Typography
                variant="body1"
                className="!font-poppins ms-4"
                label={balance.toString()}
              />
            </div>
          </div>
        </div>

        <div className="">
          <TextInput
            rightComponent={
              <div className="flex h-full  py-2 items-center justify-center">
                <div className="h-full w-[1px] bg-secondary"></div>
                <Typography
                  variant="body0.5"
                  className="!font-inter ml-[10px] pr-[14px] text-secondary"
                  label="MAX"
                />
              </div>
            }
            id="#id"
            rounded
            className="!w-full"
            placeholder="Enter amount"
          />
          <div className="mt-[16px]">
            <Slider
              className="w-full"
              sliderValue={value}
              setSliderValue={setValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Deposit({ onClose }: { onClose: Function }) {
  const [current, setCurrent] = useState<"manual" | "auto">("auto");
  return (
    <div>
      <Modal onClose={onClose} title="Deposit" visible={true}>
        <>
          <div className="md:px-[40px] px-5">
            <div className="grid grid-cols-2 cursor-pointer mb-8">
              <div onClick={() => setCurrent("auto")}>
                <Typography
                  className={`${
                    current == "auto" ? "bg-[#201B31] shadow-tab" : ""
                  } rounded-[20px] transition-all   py-3 text-center `}
                  variant="body3"
                  label="Auto"
                />
              </div>
              <div onClick={() => setCurrent("manual")}>
                <Typography
                  className={`${
                    current == "manual" ? "bg-[#201B31] shadow-tab" : ""
                  } rounded-[20px] transition-all   py-3 text-center `}
                  variant="body3"
                  label="Manual"
                />
              </div>
            </div>
          </div>
          <div className="md:px-[40px] px-5">
            {current == "auto" ? <Auto /> : <Manual />}
          </div>
        </>
      </Modal>
    </div>
  );
}
