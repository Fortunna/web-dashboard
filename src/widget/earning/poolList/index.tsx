import Button from "@/components/button";
import Typography from "@/components/typography";
import React, { useState } from "react";
import Image from "next/image";
import { Ankr, ArrowUp, BnB, Curve, Dai, Usdc, Usdt } from "@/components/icons";
import TextInput from "@/components/input";
import Slider from "@/components/slider";
import ActivityChart from "./activityChart";
import { PoolCollection } from "@/constants";
// import FarmActionModal from "./actionModal";

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
export default function PoolList({
  pool,
  onStake,
  active,
}: {
  pool: PoolCollection
  onStake: React.MouseEventHandler<HTMLButtonElement>;
  active: boolean;
}) {
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [value, setValue] = useState<number>(0);
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
                <BnB />
              </div>
            </div>
            <Typography variant="subtitle" label={pool.name} />
          </div>

          <div className="lg:grid lg:grid-cols-4 gap-10 mt-[32px] ">
            <div>
              {" "}
              <Typography
                variant="body3"
                className="!font-poppins-light text-light-2"
                label="Platform"
              />
              <div className="flex items-center mt-2">
                <Ankr />
                <Typography
                  variant="heading"
                  className="ml-[8px] !font-poppins-semi-bold"
                  label="Ankr"
                />
              </div>
            </div>
            <div className="md:my-0 my-4">
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
            <div>
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
        <div className="flex items-center">
          <div className="md:block flex ">
            <Button
              theme="secondary"
              onClick={onStake}
              label="Stake"
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
        <div className="lg:grid lg:grid-cols-[30%_auto] lg:gap-16 mt-[60px]">
          <div>
            <ActivityChart />
          </div>
          <div className="lg:grid lg:grid-cols-3 lg:gap-14">
            <div>
              <Typography
                className="!font-inter mb-1"
                variant="body1"
                label="Wallet Balance"
              />
              <Typography
                className="!font-inter !text-secondary "
                variant="body3"
                label="13.65 BNB"
              />

              <div className="mt-[30px]">
                <TextInput
                  rightComponent={
                    <div className="flex h-full  py-2 items-center justify-center">
                      <div className="h-full w-[1px] bg-secondary"></div>
                      <Typography
                        variant="body0.5"
                        className="!font-inter ml-[10px] mr-[14px] text-secondary"
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
                  <Slider className="w-full" sliderValue={value} setSliderValue={setValue}/>
                </div>
              </div>
              <Button
                className="w-full mt-[19px]"
                size="small"
                rounded
                theme="secondary-solid"
                label="Deposit"
              />
            </div>
            <div>
              <Typography
                className="!font-inter mb-2"
                variant="body1"
                label="Available Balance"
              />
              <Typography
                className="!font-inter !text-secondary "
                variant="body3"
                label="13.65 BNB"
              />

              <div className="mt-[30px]">
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
                  <Slider className="w-full" sliderValue={value} setSliderValue={setValue} />
                </div>
              </div>
              <Button
                className="w-full mt-[19px]"
                size="small"
                rounded
                theme="secondary-solid"
                disabled
                label="Withdraw"
              />
            </div>
            <div className="lg:my-0 my-10">
              <Typography
                className="!font-inter mb-2"
                variant="body1"
                label="Current Rewards"
              />
              <Typography
                className="!font-inter !text-secondary "
                variant="body3"
                label="13.65 BNB"
              />

              <div className="mt-[30px]">
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
                  className="!w-full"
                  rounded
                  placeholder="Enter amount"
                />
                <div className="mt-[16px]">
                  <Slider className="w-full" sliderValue={value} setSliderValue={setValue} />
                </div>
              </div>
              <Button
                className="w-full mt-[19px]"
                size="small"
                rounded
                theme="secondary-solid"
                disabled
                label="Claim Rewards"
              />
            </div>
          </div>
        </div>
      ) : null}

      {/* <FarmActionModal /> */}
    </div>
  );
}
