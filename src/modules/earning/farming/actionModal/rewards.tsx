import Button from "@/components/button";
import { Dai, Usdc, Usdt } from "@/components/icons";
import TextInput from "@/components/input";
import Select from "@/components/select";
import Slider from "@/components/slider";
import Typography from "@/components/typography";
import { TokenInfos } from "@/constants";
import React from "react";


type componentProps = {
  tokenAInfo: TokenInfos,
  tokenBInfo: TokenInfos,
  pool: string
};
export default function Rewards({
  tokenAInfo,
  tokenBInfo,
  pool
}:componentProps) {
  return (
    <div className="">
      <div className="w-[80%] mt-[35px] mb-[28px] mx-auto">
        <div>
          <div className="flex items-center w-full justify-center">
            <div>
              <div className="flex items-center mb-7 overflow-hidden relative">
                <Usdc />
                <TextInput
                  id="item2"
                  value="30.43"
                  className="rounded-full mx-3 text-white focus:outline-none !border-[#AC6AFF]"
                />
                <Typography
                  label={tokenAInfo.tokenBalanceInfo?.symbol}
                  variant="body3"
                  className="!font-inter !text-secondary"
                />
              </div>
              <div className="flex items-center">
                <Usdt />
                <TextInput
                  id="item3"
                  value="30.43"
                  className="rounded-full mx-3 text-white focus:outline-none !border-[#AC6AFF]"
                />
                <Typography
                  label={tokenBInfo.tokenBalanceInfo?.symbol}
                  variant="body3"
                  className="!font-inter !text-secondary"
                />
              </div>
            </div>
          </div>
        </div>
        <Button
          className="w-full mt-[48px]"
          label="Reward"
          rounded
          theme="secondary-solid"
        />
      </div>
    </div>
  );
}
