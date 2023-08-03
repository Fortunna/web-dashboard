import Button from "@/components/button";
import { Dai, Usdc, Usdt } from "@/components/icons";
import TextInput from "@/components/input";
import Typography from "@/components/typography";
import { TOAST_MESSAGE, TokenInfos } from "@/constants";
import { ethers } from "ethers";
import React, { useState } from "react";
import FortunnaTokenABI from "@/assets/FortunnaToken.json";
import FortunnaPoolABI from "@/assets/FortunnaPool.json";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Address, usePublicClient, useWalletClient } from "wagmi";


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

  const {data:walletClient} = useWalletClient();
  const publicClient = usePublicClient();
  const [status, setStatus] = useState<boolean>(false);

  const onHandleReward = async () => {

    setStatus(true);

    setStatus(false);
  }

  return (
    <div className="">
      <div className="w-[80%] mt-[35px] mb-[28px] mx-auto">
        <div>
          <div className="flex items-center w-full justify-center">
            <div>
              <div className="flex items-center mb-7 overflow-hidden relative">
                <Usdc />
                <Typography
                  label={tokenAInfo.tokenBalanceInfo?.symbol}
                  variant="body3"
                  className="!font-inter !text-secondary"
                />
              </div>
              <div className="flex items-center">
                <Usdt />
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
          disabled={status}
          theme="secondary-solid"
        />
      </div>
    </div>
  );
}
