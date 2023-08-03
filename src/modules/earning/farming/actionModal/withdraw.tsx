import Button from "@/components/button";
import { Dai, Usdc, Usdt } from "@/components/icons";
import TextInput from "@/components/input";
import Typography from "@/components/typography";
import { TokenInfos } from "@/constants";
import React, { useState } from "react";


type componentProps = {
  tokenAInfo: TokenInfos,
  tokenBInfo: TokenInfos,
  pool: string
};
export default function Withdraw({
  tokenAInfo,
  tokenBInfo,
  pool
}:componentProps) {

  const [tokenAInput, setTokenAInput] = useState<string>("0");
  const [tokenBInput, setTokenBInput] = useState<string>("0");
  
  let validNumber = new RegExp(/^\d*\.?\d*$/);

  return (
    <div className="">
      <div className="w-[80%] mt-[35px] mb-[28px] mx-auto">
        <div>
          <div className="flex items-center w-full justify-center">
            <div>
              <div className="flex items-center mb-7 overflow-hidden relative">
                <Usdc />
                <TextInput
                  value={tokenAInput}
                  id="withdraw-3"
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
                  id="withdraw"
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
          label="Withdraw"
          rounded
          theme="secondary-solid"
        />
      </div>
    </div>
  );
}
