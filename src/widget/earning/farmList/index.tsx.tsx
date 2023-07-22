import Button from "@/components/button";
import Typography from "@/components/typography";
import React, { useState } from "react";
import Image from "next/image";
import { ArrowUp, Curve, Dai, Usdc, Usdt } from "@/components/icons";
import ActivityChart from "./activityChart";
import FarmActionModal from "./actionModal";

const activeTokenData = [
  {
    value: "1000 DAI",
    icon: <Dai />,
  },
  {
    value: "950 USDC",
    icon: <Usdc />,
  },
  {
    value: "11085 USDT",
    icon: <Usdt />,
  },
];

const Assets = () => {
  return (
    <div>
      {activeTokenData.map((token, index) => {
        return (
          <div
            className={`flex items-center ${index ? "mt-2" : null} `}
            key={index}
          >
            {token.icon}
            <Typography
              label={token.value}
              className="!font-inter !text-secondary ml-2"
              variant="body3"
            />
          </div>
        );
      })}
    </div>
  );
};
export default function FarmList({
  active,
  onOpenActionModal,
  onJoinPool,
}: any) {
  const [selectedFarm, setSelectedFarm] = useState(null);

  return (
    <div
      style={{ backgroundColor: "rgba(27, 28, 32, 0.6)" }}
      className="lg:p-[32px] p-[20px]"
    >
      <div className="lg:flex lg:flex-row justify-between">
        <div className="lg:w-[70%]">
          <div className="flex flex-row items-center">
            <div className="flex mr-4">
              <div>
                <Dai />
              </div>
              <div className="-ml-3">
                <Usdt />
              </div>
              <div className="-ml-3">
                <Usdc />
              </div>
            </div>
            <Typography variant="subtitle" label="Curve 3Pool " />
          </div>

          <div className="grid lg:grid-cols-4  grid-cols-2  gap-10 mt-[32px] ">
            <div className="md:mb-0">
              {" "}
              <Typography
                variant="body3"
                className="!font-poppins-light text-light-2"
                label="Platform"
              />
              <div className="flex items-center mt-2">
                <Curve />
                <Typography
                  variant="heading"
                  className="ml-[8px] !font-poppins-semi-bold"
                  label="Curve"
                />
              </div>
            </div>
            <div className="md:mb-0">
              <Typography
                variant="body3"
                className="!font-poppins-light text-light-2"
                label="Apy"
              />
              <div className="mt-2 flex items-center">
                <div className="bg-success-3  mr-[8px]  items-center inline-block w-[26px] h-[16px] rounded-[5px]">
                  <div className="flex ] items-center justify-center">
                    <ArrowUp />
                  </div>
                </div>

                <Typography
                  variant="heading"
                  className="!font-poppins-semi-bold"
                  label="5%"
                />
              </div>
            </div>
            <div className="md:mb-0">
              <Typography
                variant="body3"
                className="!font-poppins-light text-light-2"
                label="Volume"
              />
              <Typography
                variant="heading"
                className="!font-poppins-semi-bold mt-2"
                label="$15,000,000"
              />
            </div>
            <div>
              <Typography
                variant="body3"
                className="!font-poppins-light text-light-2 whitespace-nowrap"
                label="Total Value Locked"
              />
              <Typography
                variant="heading"
                className="!font-poppins-semi-bold mt-2"
                label="$500,000,000"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center md:mt-0 mt-10">
          <div className="md:block flex ">
            <Button
              theme="secondary"
              onClick={onJoinPool}
              label="Join Pool"
              rightComponent={
                <svg
                  className="ms-1"
                  width="11"
                  height="10"
                  viewBox="0 0 11 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_51_30003)">
                    <path
                      d="M0.705078 5.3125L5.39258 0.625M5.39258 0.625H0.705078M5.39258 0.625V5.3125"
                      stroke="#FCFCFC"
                      stroke-width="0.9375"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_51_30003">
                      <rect
                        width="6.25"
                        height="6.25"
                        fill="white"
                        transform="translate(0.0800781)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              }
              className="!font-poppins-light md:mr-0 mr-3 md:w-[170px]"
            />
          </div>
        </div>
      </div>
      {active ? (
        <>
          <div className="lg:grid lg:grid-cols-[30%_auto] lg:gap-16 md:mt-[60px] mt-[40px]">
            <div className=" md:mb-0 mb-10">
              <ActivityChart />
            </div>
            <div className="grid lg:grid-cols-3 lg:gap-14">
              <div className="md:mb-0 mb-8 relative overflow-hidden">
                <Typography
                  className="!font-inter mb-2"
                  variant="body1"
                  label="Current Balance"
                />
                <Assets />

                <Button
                  className="w-full mt-9"
                  size="small"
                  onClick={onOpenActionModal}
                  rounded
                  theme="secondary-solid"
                  label="Deposit"
                />
              </div>
              <div className="relative overflow-hidden">
                <Typography
                  className="!font-inter mb-2"
                  variant="body1"
                  label="Available Balance"
                />
                <Assets />
                <Button
                  className="w-full mt-9"
                  size="small"
                  rounded
                  theme="secondary-solid"
                  onClick={onOpenActionModal}
                  disabled
                  label="Withdraw"
                />
              </div>
              <div className="lg:my-0 my-8">
                <Typography
                  className="!font-inter mb-2"
                  variant="body1"
                  label="Current Rewards"
                />
                <Assets />
                <Button
                  className="w-full mt-9"
                  size="small"
                  onClick={onOpenActionModal}
                  rounded
                  theme="secondary-solid"
                  disabled
                  label="Claim Rewards"
                />
              </div>
            </div>
          </div>
        </>
      ) : null}

      <FarmActionModal />
    </div>
  );
}
