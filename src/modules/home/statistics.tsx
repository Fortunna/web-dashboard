import Card from '@/components/card';
import Typography from '@/components/typography';
import React from 'react';

export default function Statistics() {
  const data = [
    {
      value: '$ -',
      name: 'Total Staked Value',
    },
    {
      value: '$ -',
      name: '$FTN Balance',
    },
    {
      value: '$ -',
      name: 'Other Assets',
    },
    {
      value: '%-',
      name: '% ROI Earned',
    },
  ];

  return (
    <div>
      <Typography
        variant="semi-heading"
        className="!font-aeonik-pro  md:pb-4"
        label="Statistics"
      />

      <div className=" bg-home-stat-bg  md:px-0 px-10 py-10 items-center bg-[length:100%_100%] rounded-[18px] md:flex md:justify-around md:py-6   overflow-hidden grid grid-cols-2 md:gap-0 gap-8">
        {data?.map((_stac, index) => {
          return (
            <div key={index} className={`md:mt-0 flex items-center  `}>
              <div className="">
                <Typography
                  className="md:!text-[40px] !text-[30px] !font-aeonik-pro !text-[#EFF3FB] !font-bold"
                  label={_stac?.value}
                />
                <Typography
                  variant="body1"
                  className="!font-inter !text-white"
                  label={_stac?.name}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
