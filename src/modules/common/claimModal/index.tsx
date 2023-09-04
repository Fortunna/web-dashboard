import Modal from "@/components/modal";
import React, { useState } from "react";
import Image from "next/image";
import Typography from "@/components/typography";
import TextInput from "@/components/input";
import Slider from "@/components/slider";
import Button from "@/components/button";
import RangeInputWithSteps from "@/components/stepper/withSteps";
import CheckBox from "@/components/checkbox";

const reward = [
  {
    balance: "0.1 DAI",
    img: "/dai.png",
  },
  {
    balance: "0.25 ETH",
    img: "/eth.png",
  },
  {
    balance: "0.456 BTC",
    img: "/btc.png",
  },
  {
    img: "/binance.png",
    balance: "0.00 BNB",
  },
  {
    img: "/usdc.png",
    balance: "0.01 USDC",
  },
  {
    balance: "100.00 USDT",
    img: "/usdt.png",
  },
];

const _all_key = reward?.map((r) => r.balance);

export default function ClaimModal({ onClose }: { onClose: Function }) {
  const [selectedRewards, setSelectedRewards] = useState<string[]>([]);

  return (
    <div>
      <Modal onClose={onClose} title="Rewards" visible={true}>
        <>
          <div className="md:px-[40px] px-5">
            <Typography
              variant="body3"
              className="!font-inter mb-3"
              label="Rewards"
            />
            {/* <RangeInputWithSteps /> */}
            <div className="border-[1px] border-[#2A2D3C] py-6 px-4 rounded-[16px]">
              {reward.map((reward, index) => {
                return (
                  <div className="flex items- justify-between" key={index}>
                    <div
                      onClick={() => {
                        const present = selectedRewards.includes(
                          reward.balance
                        );
                        if (present) {
                          const _data = selectedRewards.filter(
                            (c) => c !== reward.balance
                          );
                          setSelectedRewards(_data);
                        } else {
                          setSelectedRewards((prev) => [
                            ...prev,
                            reward.balance,
                          ]);
                        }
                      }}
                      className="flex items-center overflow-hidden "
                    >
                      <div className="flex items-center">
                        <CheckBox
                          checked={selectedRewards.includes(reward.balance)}
                          id={index.toString()}
                        />
                        <label
                          htmlFor={index.toString()}
                          className="flex items-center ms-2"
                        >
                          <Image
                            height={24}
                            className="ms-3 mr-2"
                            width={24}
                            src={reward.img}
                            alt="img"
                          />
                          <Typography
                            variant="body2"
                            className="!font-inter py-3"
                            label={reward.balance}
                          />
                        </label>
                      </div>
                    </div>

                    {index == 0 ? (
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => {
                          if (selectedRewards?.length > 5) {
                            setSelectedRewards([]);
                          } else {
                            setSelectedRewards(_all_key);
                          }
                        }}
                      >
                        <CheckBox
                          checked={selectedRewards?.length > 5}
                          id="id"
                        />
                        <Typography className="ms-2" label="Check all" />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <Typography
              variant="body2"
              className="!font-poppins !text-secondary !text-center mt-6 border-[1px] border-[#334155] rounded-[8px] px-[17px] py-5"
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

            <div className="mt-[34px]"></div>

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
