import Button from "@/components/button";
import { Dai, Usdc, Usdt } from "@/components/icons";
import Image from "next/image";
import TextInput from "@/components/input";
import Typography from "@/components/typography";
import { PoolCollection, PoolMode, TOAST_MESSAGE, TokenInfos } from "@/constants";
import { ethers } from "ethers";
import React, { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import FortunnaTokenABI from "@/assets/FortunnaToken.json";
import FortunnaPoolABI from "@/assets/FortunnaPool.json";
import FortunnaUniswapV3PoolABI from "@/assets/FortunaUniswapV3Pool.json";
import { Address, usePublicClient, useWalletClient } from "wagmi";

type componentProps = {
  tokenAInfo: TokenInfos,
  tokenBInfo: TokenInfos,
  pool: PoolCollection,
  poolMode: PoolMode,
  onClose: () => void;
};
export default function Withdraw({
  tokenAInfo,
  tokenBInfo,
  pool,
  poolMode,
  onClose
}:componentProps) {

  const {data:walletClient} = useWalletClient();
  const publicClient = usePublicClient();
  
  const [tokenAInput, setTokenAInput] = useState<string>("0");
  const [tokenBInput, setTokenBInput] = useState<string>("0");

  const [status, setStatus] = useState<boolean>(false);
  
  let validNumber = new RegExp(/^\d*\.?\d*$/);

  const onCalculateLPTokenAmount = async () => {
    
    let tokenArray = [];
    const tokenAAmount = ethers.parseUnits(tokenAInput, tokenAInfo.tokenBalanceInfo?.decimals);
    tokenArray.push([0, tokenAAmount]);
    if (tokenBInfo.tokenAddress) {
      const tokenBAmount = ethers.parseUnits(tokenBInput, tokenBInfo.tokenBalanceInfo?.decimals);
      tokenArray.push([1,tokenBAmount]);
    }

    const txCalculate:any = await publicClient.readContract({
      address: pool.address as Address,
      abi: FortunnaPoolABI,
      functionName: "calculateFortunnaTokens",
      args:[
        tokenArray,
        tokenAInfo.stakeTokenAddress
      ]
    });

    return txCalculate;

  }
  const onWithdraw = async (amount: any) => {

    const txApproveStaking:any = await walletClient!.writeContract({
      address: pool.address as Address,
      abi: FortunnaPoolABI,
      functionName: "withdraw",
      args:[
        amount
      ]
    });

    const confirmation = await publicClient.waitForTransactionReceipt({
      hash:txApproveStaking
    });
    
    console.log("withdraw confirm", confirmation);

  }

  const onUniswapV3Withdraw = async (amount :any) => {

    const txApproveStaking:any = await walletClient!.writeContract({
      address: pool.address as Address,
      abi: FortunnaUniswapV3PoolABI,
      functionName: "withdraw",
      args:[
        amount
      ]
    });

    const confirmation = await publicClient.waitForTransactionReceipt({
      hash:txApproveStaking
    });
    
    console.log("withdraw confirm", confirmation);
  }

  const onBurnStakeToken = async(amount:any) => {

    const txApproveStaking:any = await walletClient!.writeContract({
      address: tokenAInfo.stakeTokenAddress as Address,
      abi: FortunnaTokenABI,
      functionName: "burn",
      args:[
        walletClient?.account.address,
        amount
      ]
    });

    const confirmation = await publicClient.waitForTransactionReceipt({
      hash:txApproveStaking
    });

    console.log('burn confirm', confirmation);
  }

  const onHandleWithdraw = async () => 
  {

    const tokenAInputAmount = parseFloat(tokenAInput);
    const tokenBInputAmount = parseFloat(tokenBInput);
    const tokenABalance = ethers.formatUnits(tokenAInfo.tokenStakeBalance.toString(), tokenAInfo.tokenBalanceInfo?.decimals);
    let tokenBBalance = "0";
    if (tokenBInfo.tokenAddress)
      tokenBBalance = ethers.formatUnits(tokenBInfo.tokenStakeBalance.toString(), tokenBInfo.tokenBalanceInfo?.decimals);

    if (tokenAInputAmount == 0 ||
        tokenAInputAmount > parseFloat(tokenABalance) ||
        (tokenBInfo.tokenAddress && (tokenBInputAmount == 0 || 
        tokenBInputAmount > parseFloat(tokenBBalance)))
    ){
      toast.error(TOAST_MESSAGE.DATA_INCORRECT, {
        position: toast.POSITION.TOP_CENTER
      });      
      return ;
    }

    setStatus(true);
    try {

      if (poolMode == PoolMode.CLASSIC_FARM) {
        const amount = await onCalculateLPTokenAmount();

        await onWithdraw(amount);

        await onBurnStakeToken(amount);
      } else {

        const tokenInput = ethers.parseUnits(tokenAInput, tokenAInfo.tokenBalanceInfo?.decimals);

        await onUniswapV3Withdraw(tokenInput);
      }

      toast.success(TOAST_MESSAGE.TRANSACTION_SUBMITTED, {
        position: toast.POSITION.TOP_CENTER
      });
      
      onClose();
      
    } catch (ex) {
      console.log(ex);
      toast.error(TOAST_MESSAGE.UNEXPECTED_ERROR, {
        position: toast.POSITION.TOP_CENTER
      });

    }

    setStatus(false);
  }

  return (
    <div className="">
      <div className="w-[80%] mt-[35px] mb-[28px] mx-auto">
        <div>
          <div className="flex items-center w-full justify-center">
            <div>
              <div className="flex items-center mb-7 overflow-hidden relative">
                <Image
                    height={40}
                    className="ms-3 mr-2"
                    width={30}
                    src={pool.tokenALogo.length ? pool.tokenALogo : "/default_token.png"}
                    alt="img"
                />
                <TextInput
                  value={tokenAInput}
                  id="withdraw-3"
                  className="rounded-full mx-3 text-white focus:outline-none !border-[#AC6AFF]"
                  onChange={(e) => {
                    if (validNumber.test(e.target.value)) {
                      setTokenAInput(e.target.value);
                      if (poolMode == PoolMode.UNISWAP_POOL)
                        setTokenBInput(e.target.value);

                    }
                  }}
                />
                <Typography
                  label={tokenAInfo.tokenBalanceInfo?.symbol}
                  variant="body3"
                  className="!font-inter !text-secondary"
                />
              </div>
              { tokenBInfo.tokenAddress && 
              <div className="flex items-center">
                <Image
                    height={40}
                    className="ms-3 mr-2"
                    width={30}
                    src={pool.tokenBLogo.length ? pool.tokenBLogo : "/default_token.png"}
                    alt="img"
                />
                <TextInput
                  id="withdraw"
                  value={tokenBInput}
                  className="rounded-full mx-3 text-white focus:outline-none !border-[#AC6AFF]"
                  onChange={(e) => {
                    if (validNumber.test(e.target.value)) {
                      setTokenBInput(e.target.value);
                      if (poolMode == PoolMode.UNISWAP_POOL)
                        setTokenAInput(e.target.value);
                    }
                  }}
                />
                <Typography
                  label={tokenBInfo.tokenBalanceInfo?.symbol}
                  variant="body3"
                  className="!font-inter !text-secondary"
                />
              </div>
              }
            </div>
          </div>
        </div>
        <Button
          className="w-full mt-[48px]"
          label="Withdraw"
          rounded
          theme="secondary-solid"
          disabled = {status}
          onClick={onHandleWithdraw}
        />
      </div>
    </div>
  );
}
