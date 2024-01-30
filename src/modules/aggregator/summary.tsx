import { AnimateFadeIn } from '@/animations';
import Card from '@/components/card';
import Typography from '@/components/typography';
import React from 'react';

export default function Summary() {
  const data = [
    {
      value: '$ -',
      name: 'Total Value Locked',
    },
    {
      value: '- %',
      name: 'APY',
    },
    {
      value: '$ -',
      name: 'Total Rewards',
    },
  ];

  return (
    <div>
      <div className="md:flex md:justify-around md:text-start text-center  py-[56px] overflow-hidden relative rounded-[8px] ">
        {data?.map((_stac, index) => {
          return (
            <div className={`md:mt-0 ${index ? 'mt-9' : ''}`} key={index}>
              <AnimateFadeIn animationPosition="leftToRight" delay={index / 4}>
                <>
                  <Typography
                    variant="body1"
                    className="!font-aeonik-pro !font-[20px] !font-white"
                    label={_stac?.name}
                  />
                  <Typography
                    className="!text-[35px] !font-aeonik-pro !text-[#EFF3FB] !font-bold"
                    label={_stac?.value}
                  />
                </>
              </AnimateFadeIn>
            </div>
          );
        })}
      </div>
    </div>
  );
}
