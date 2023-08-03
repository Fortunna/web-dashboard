import Button from "@/components/button";
import { Dai, Usdc, Usdt } from "@/components/icons";
import TextInput from "@/components/input";
import Select from "@/components/select";
import Slider from "@/components/slider";
import Typography from "@/components/typography";
import { TokenInfos } from "@/constants";
import React, { useState } from "react";


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

  const [tokenAInput, setTokenAInput] = useState<string>("0");
  const [tokenBInput, setTokenBInput] = useState<string>("0");

  let validNumber = new RegExp(/^\d*\.?\d*$/);


  const onHandleWithdraw = async () => {

    

  }

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
                  value={tokenAInput}
                  className="rounded-full mx-3 text-white focus:outline-none !border-[#AC6AFF]"
                  onChange={(e) => {
                    if (validNumber.test(e.target.value)) {
                      setTokenAInput(e.target.value);
                    }
                  }}                  
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
                  value={tokenBInput}
                  className="rounded-full mx-3 text-white focus:outline-none !border-[#AC6AFF]"
                  onChange={(e) => {
                    if (validNumber.test(e.target.value)) {
                      setTokenBInput(e.target.value);
                    }
                  }}                  
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
          onClick={onHandleWithdraw}
        />
      </div>
    </div>
  );
}
