import Button from '@/components/button';
import { CancelIcon, PlayIcon } from '@/components/icons';
import Typography from '@/components/typography';
import React from 'react';

export default function AggregatorBanner() {
  return (
    <div className="relative">
      <div className="md:grid md:grid-cols-[80%_auto] bg-dark-4 py-6 rounded-[10px] overflow-hidden relative">
        <div className="md:flex md:items-center">
          <div className="flex items-center">
            <div className="mr-2 overflow-hidden relative min-w-[103px] min-h-[103px] max-w-[103px]  max-h-[103px]">
              <video autoPlay loop className=" w-[103px] h-[103px]">
                <source src="/aggregator.mp4" type="video/mp4"></source>
              </video>
            </div>
            <div className="!mr-[28px]">
              <Typography
                className="!text-[18px] !font-aeonik-pro font-bold !whitespace-nowrap"
                label="AI Aggregator"
              />
              {/* <Typography
                variant="body1"
                className="!font-inter !text-[#CFCFCF]"
                label="Discover the Oracle "
              /> */}
              <div className="md:block hidden">
                <Button
                  size="small"
                  className="!py-1 mt-4"
                  leftComponent={
                    <div className="mr-[4px]">
                      <PlayIcon />
                    </div>
                  }
                  label="Play Video"
                  theme="secondary"
                />
              </div>
            </div>
          </div>
          <div className="px-10">
            <Typography
              className="!font-inter-light pt-2 !text-[#CFCFCF]"
              variant="body2"
              label="Effortlessly maximize you returns. Personalize your risk level and let it work for you. Automatic or manual – your choice, your yield."
            />

            <div className="block md:hidden">
              <Button
                size="small"
                className="!py-1 mt-4"
                leftComponent={
                  <div className="mr-[4px]">
                    <PlayIcon />
                  </div>
                }
                label="Play Video"
                theme="secondary"
              />
            </div>
          </div>
        </div>
        <div className=""></div>
      </div>
      <div className="absolute top-7 md:right-[70px] right-10">
        <CancelIcon />
      </div>
    </div>
  );
}
