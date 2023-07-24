import Modal from "@/components/modal";
import React, { useState } from "react";
import Image from "next/image";
import Typography from "@/components/typography";
import TextInput from "@/components/input";
import Slider from "@/components/slider";
import Button from "@/components/button";
import RangeInputWithSteps from "@/components/stepper/withSteps";

type componentProps = {
  imgSrc: string;
  name: string;
  balance: number;
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
            <Typography
              label="0.0"
              className="!font-poppins !text-[#888DAA] !text-[33px]"
            />
            <Typography />
          </div>
          <div className="">
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

        <div className=" flex items-center justify-end">
          <Typography
            variant="body2"
            className="!font-poppins-semi-bold ml-[10px] pr-[14px] !text-secondary !font-bold"
            label="MAX"
          />

          <div className="border-[1px] flex items-center  py-3 px-4 rounded-[12px] border-[#222531]">
            <div style={{ width: "36px", height: "36px" }} className="mr-3">
              <Image src={imgSrc} width={36} height={36} alt="Img" />
            </div>
            <Typography
              variant="body2"
              className="!font-poppins"
              label={name}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ClaimModal({ onClose }: { onClose: Function }) {
  return (
    <div>
      <Modal onClose={onClose} title="Claim Rewards" visible={true}>
        <>
          <div className="md:px-[40px] px-5">
            <Typography
              variant="body2"
              className="font-poppins text-center"
              label="Amount"
            />

            <Typography
              variant="title"
              className="!text-[64px] !text-center !bg-clip-text bg-text-clip !text-transparent !font-poppins"
              label="0%"
            />
            <div className="mt-3"></div>
            {/* <RangeInputWithSteps /> */}
            <SingleCoinOption name="DAI" imgSrc="/dai.png" balance={200} />
            <div className="mt-[20px]"></div>
            <SingleCoinOption name="USDT" imgSrc="/usdt.png" balance={200} />
            <div className="mt-[20px]"></div>
            <SingleCoinOption name="USDC" imgSrc="/usdc.png" balance={200} />
            <div className="mt-[34px]"></div>

            <div className="grid grid-cols-[30%_auto]">
              <div>
                <Typography
                  variant="body1"
                  className="!text-[#ABAFC4] !font-inter text-start mb-2"
                  label="Price"
                />
              </div>
              <div>
                <Typography
                  variant="body1"
                  className="!text-[#ABAFC4] !font-inter text-end mb-2"
                  label="1 DAI = 0.0.095 DAI"
                />
              </div>
            </div>
            <div>
              <Typography
                variant="body1"
                className="!text-[#ABAFC4] !font-inter text-end mb-2"
                label="1 USDT = 0.00102441 ETH"
              />
              <Typography
                variant="body1"
                className="!text-[#ABAFC4] !font-inter text-end"
                label="1 USDC = 0.00102441 ETH"
              />
            </div>
            <div className="mt-[34px]"></div>

            <Button
              size="big"
              className="w-full"
              theme="harsh"
              label="Claim Reward"
            />
            <div className="mt-[40px]"></div>
          </div>
        </>
      </Modal>
    </div>
  );
}
