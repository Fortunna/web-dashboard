import Button from '@/components/button';
import Card from '@/components/card';
import { RefreshIcon } from '@/components/icons';
import Typography from '@/components/typography';
import React, { useState } from 'react';
import Deposit from '../common/depositModal/index';
import ClaimModal from '../common/claimModal/index';

export default function Balance() {
  const data = [
    {
      name: 'Deposited',
      value: '$ -',
    },
    {
      name: 'APY',
      value: '- %',
    },
    {
      name: 'Rewards',
      value: '$ -',
    },
  ];

  const [showDeposit, setShowShowDeposit] = useState(false);
  const [showClaim, setShowShowClaim] = useState(false);
  return (
    <>
      <div className="flex items-center mb-[8px]">
        <Typography
          label="Current Balance"
          className="!font-inter !text-white"
        />
        <div className="ml-2 w-[28px] h-[28px] rounded-full bg-transparent-3 flex justify-center items-center">
          <RefreshIcon />
        </div>
      </div>

      <Card>
        <>
          <div className="md:grid md:grid-cols-3 gap-4">
            {data?.map((_b, index) => {
              return (
                <div className="md:mt-0 mt-7" key={index}>
                  <Typography
                    variant="body2"
                    className="!font-inter mb-2"
                    label={_b.name}
                  />
                  <div className="p-[1px] bg-secondary-gradient rounded-[8px] overflow-hidden relative">
                    <div className=" w-full bg-background  p-4 items-center rounded-[8px] overflow-hidden relative">
                      <Typography
                        variant="semi-heading"
                        className="!font-inter !font-[19px] !text-right"
                        label={_b.value}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center mt-[48px]">
            <Button
              onClick={() => setShowShowDeposit(true)}
              label="Deposit"
              theme="secondary"
              className=" md:w-[20%] cursor-pointer"
              rightComponent={
                <svg
                  width={7}
                  height={7}
                  className="ml-2"
                  viewBox="0 0 7 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_199_11828)">
                    <path
                      d="M0.705078 5.3125L5.39258 0.625M5.39258 0.625H0.705078M5.39258 0.625V5.3125"
                      stroke="#FCFCFC"
                      strokeWidth="0.9375"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_199_11828">
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
            />
            <div className="mx-5"></div>
            <Button
              label="Claim"
              theme="secondary"
              outline
              onClick={() => setShowShowClaim(true)}
              className=" md:w-[20%]"
              rightComponent={
                <svg
                  width={7}
                  height={7}
                  className="ml-2"
                  viewBox="0 0 7 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_199_11828)">
                    <path
                      d="M0.705078 5.3125L5.39258 0.625M5.39258 0.625H0.705078M5.39258 0.625V5.3125"
                      stroke="#FCFCFC"
                      strokeWidth="0.9375"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_199_11828">
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
            />
          </div>
        </>
      </Card>
      {showDeposit && <Deposit onClose={() => setShowShowDeposit(false)} />}
      {showClaim && <ClaimModal onClose={() => setShowShowClaim(false)} />}
    </>
  );
}
