import Modal from "@/components/modal";
import React, { useState } from "react";
import Image from "next/image";
import Typography from "@/components/typography";
import TextInput from "@/components/input";
import Slider from "@/components/slider";
import Button from "@/components/button";

type componentProps = {
  imgSrc: string;
  name: string;
  balance: number;
};

const SingleCoinOption = ({ imgSrc, name, balance }: componentProps) => {


  const [sliderVal, setSliderVal] = useState<number>(0);

  return (
    <div className="border-[1px] border-[#2A2D3C] py-6 px-4 rounded-[16px]">
      <div className="grid grid-cols-[40%_auto]">
        <div className="flex items-center">
          <div style={{ width: "46px", height: "46px" }}>
            <Image src={imgSrc} width={46} height={46} alt="Img" />
          </div>

          <div className="ms-4">
            <Typography
              className="!md:text-[20px] !text-[15px] !font-inter !font-bold"
              label={name}
            />
            <div className="flex items-center">
              <Typography
                variant="body0.5"
                className="!font-poppins !text-white"
                label={"Balance:"}
              />
              <Typography
                variant="body0.5"
                className="!font-poppins ms-4 !text-white"
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
              sliderValue = {sliderVal}
              setSliderValue={setSliderVal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Deposit({ onClose }: { onClose: Function }) {
  return (
    <div>
      <Modal onClose={onClose} title="Deposit" visible={true}>
        <>
          <div className="md:px-[40px] px-5">
            <SingleCoinOption name="DAI" imgSrc="/dai.png" balance={200} />
            <div className="mt-[20px]"></div>
            <SingleCoinOption name="USDT" imgSrc="/usdt.png" balance={200} />
            <div className="mt-[20px]"></div>
            <SingleCoinOption name="USDC" imgSrc="/usdc.png" balance={200} />
            <div className="mt-[24px]"></div>

            <div>
              <Typography
                variant="body2"
                className="!font-poppins !text-[#94A3B8] border-[1px] border-[#334155] rounded-[8px] px-[17px] py-[9px]"
              >
                <div>
                  Deposit liquidity on Balancer, and then stake your received
                  BPT here to earn. These tokens automatically earn fees
                  proportional to your share of the pool, and can be redeemed at
                  anytime
                  <svg
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
                  </svg>
                </div>
              </Typography>
            </div>
            <div className="mt-[24px]"></div>

            <Button
              size="big"
              className="w-full"
              theme="harsh"
              label="Deposit"
            />
            <div className="mt-[40px]"></div>
          </div>
        </>
      </Modal>
    </div>
  );
}
