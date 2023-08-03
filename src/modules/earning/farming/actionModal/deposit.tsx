import Button from "@/components/button";
import { Dai, Usdc, Usdt } from "@/components/icons";
import TextInput from "@/components/input";
import Select from "@/components/select";
import Slider from "@/components/slider";
import Typography from "@/components/typography";
import ERC20TokenABI from "@/assets/ERC20ABI.json";
import FortunnaTokenABI from "@/assets/FortunnaToken.json";
import FortunnaPoolABI from "@/assets/FortunnaPool.json";
import { TOAST_MESSAGE, TokenInfos } from "@/constants";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { Address, usePublicClient, useWalletClient } from "wagmi";
import { toast } from "react-toastify";
import { error } from "highcharts";

type componentProps = {
  tokenAInfo: TokenInfos,
  tokenBInfo: TokenInfos,
  pool: string
};
export default function Deposit({
  tokenAInfo,
  tokenBInfo,
  pool
}:componentProps) {

  const {data:walletClient} = useWalletClient();
  const publicClient = usePublicClient();
  const [tokenAInput, setTokenAInput] = useState<string>("0");
  const [tokenBInput, setTokenBInput] = useState<string>("0");
  const [sliderAVal, setSliderAVal] = useState<number>(0);
  const [sliderBVal, setSliderBVal] = useState<number>(0);
  const tokenABalance = ethers.formatUnits(tokenAInfo.tokenBalanceInfo.value, tokenAInfo.tokenBalanceInfo?.decimals);
  const tokenBBalance = ethers.formatUnits(tokenBInfo.tokenBalanceInfo.value, tokenBInfo.tokenBalanceInfo?.decimals);
  const [status, setStatus] = useState<boolean>(false);

  let validNumber = new RegExp(/^\d*\.?\d*$/);

  const checkAllowance = async (
    tokenAddress: any,
    stakingAddress: string,
    stakeAmount: any,
    abi: any
  ) => {
    
    const txAllowanceStaking:any = await publicClient.readContract({
      address: tokenAddress as Address,
      abi,
      functionName: "allowance",
      args: [
        walletClient?.account.address,
        stakingAddress
      ]
    });
    
    if (txAllowanceStaking < stakeAmount)
      return false;

    return true;
  }

  const approveToken = async (
    tokenAddress: string,
    stakingAddress: string,
    abi: any
  ) => {

    try {
      const txApproveStaking:any = await walletClient!.writeContract({
        address: tokenAddress as Address,
        abi,
        functionName: "approve",
        args:[
          stakingAddress,
          ethers.MaxUint256
        ]
      });

      const confirmation = await publicClient.waitForTransactionReceipt({
        hash:txApproveStaking
      });
      return true;
    } catch (ex) {
      console.log('ex', ex);
      toast.error(TOAST_MESSAGE.UNEXPECTED_ERROR, {
        position: toast.POSITION.TOP_CENTER
      });
    }
    
    return false;

  }

  useEffect(() => {
    const valA = parseFloat(tokenABalance) * sliderAVal / 100;
    setTokenAInput(valA.toString());
    const valB = parseFloat(tokenBBalance) * sliderBVal / 100;
    setTokenBInput(valB.toString());
  }, [sliderAVal, sliderBVal])

  const onTokenPreparation = async () => {

    const allowanceTokenA = await checkAllowance(tokenAInfo.tokenAddress, tokenAInfo.stakeTokenAddress, ethers.parseUnits(tokenAInput, tokenAInfo.tokenBalanceInfo?.decimals), ERC20TokenABI);
    if (!allowanceTokenA) {
      const approve_res = await approveToken(tokenAInfo.tokenAddress, tokenAInfo.stakeTokenAddress, ERC20TokenABI);
      if (!approve_res)
        return false;
    }
    const allowanceTokenB = await checkAllowance(tokenBInfo.tokenAddress, tokenBInfo.stakeTokenAddress, ethers.parseUnits(tokenBInput, tokenBInfo.tokenBalanceInfo?.decimals), ERC20TokenABI);
    if (!allowanceTokenB) {
      const approve_res = await approveToken(tokenBInfo.tokenAddress, tokenBInfo.stakeTokenAddress, ERC20TokenABI);
      if (!approve_res)
        return false;
    }

    return true;

  }

  const onMintLPToken = async () => {

    const txMint:any = await walletClient!.writeContract({
      address: tokenAInfo.stakeTokenAddress as Address,
      abi: FortunnaTokenABI,
      functionName: "mint",
      args:[
        walletClient?.account.address,
        [
          ethers.parseUnits(tokenAInput.toString(), tokenAInfo.tokenBalanceInfo?.decimals),
          ethers.parseUnits(tokenBInput.toString(), tokenBInfo.tokenBalanceInfo?.decimals)
        ]
      ]
    });
    console.log('txMint', txMint);
    
    const confirmation = await publicClient.waitForTransactionReceipt({
      hash:txMint
    });

    const amount = BigInt(confirmation.logs[2].data).toString(10);
    console.log('confirmation', amount);

    return amount;
  }

  const onStakeLPToken = async (amount :string) => {

    const allowanceTokenA = await checkAllowance(tokenAInfo.stakeTokenAddress, pool, BigInt(amount), FortunnaTokenABI);

    if (!allowanceTokenA) {
      const approve_res = await approveToken(tokenAInfo.stakeTokenAddress, pool, FortunnaTokenABI);
      if (!approve_res){
        throw error("");
      }
    }

    console.log('stake approve success');

    const txStake:any = await walletClient?.writeContract({
      address: pool as Address,
      abi: FortunnaPoolABI,
      functionName: "stake",
      args: [
        amount
      ]
    });
    const confirmation = await publicClient.waitForTransactionReceipt({
      hash:txStake
    });

    console.log('stake confimation', confirmation);

  }
  const onHandleDeposit = async () => {
    if (parseFloat(tokenAInput) == 0 || parseFloat(tokenBInput) == 0) {
      toast.error(TOAST_MESSAGE.DATA_INCORRECT, {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }
    setStatus(true);

    console.log('pool', pool);
    console.log('lp', tokenAInfo.stakeTokenAddress);

    try{
      const pre = await onTokenPreparation();
      if (!pre) {
        setStatus(false);
      }

      const value = await onMintLPToken();
      
      await onStakeLPToken(value);

      toast.success(TOAST_MESSAGE.TRANSACTION_SUBMITTED, {
        position: toast.POSITION.TOP_CENTER
      });

    } catch (ex) {
      console.log('ex', ex);
      toast.error(TOAST_MESSAGE.USER_REJECTED, {
        position: toast.POSITION.TOP_CENTER
      });
    }
    setStatus(false);
  }
  return (
    <div className="">
      <div className="grid grid-cols-[30%_auto] mt-[20px]">
        <div>
          <Typography
            variant="heading"
            className="!font-aeonik-pro !text-[#FCFCFC] ps-[30%] mt-1"
            label={tokenAInfo.tokenBalanceInfo.symbol}
          />
        </div>
        <div className="w-[70%]">
          <TextInput
            value={tokenAInput}
            id="oo"
            rounded
            onChange={(e) => {
              if (validNumber.test(e.target.value)) {
                setTokenAInput(e.target.value);
              }
            }}
            rightComponent={
              <div className="flex h-full  py-2 items-center justify-center cursor-pointer" onClick={(e) => {
                  setTokenAInput(tokenABalance);
                  setSliderAVal(100);
                }}>
                <div className="h-full w-[1px] bg-secondary"></div>
                <Typography
                  variant="body0.5"
                  className="!font-inter ml-[10px] mr-[14px] text-secondary"
                  label="MAX"
                  
                />
              </div>
            }
            className="focus:outline-none w-full focus:border-[#AC6AFF] !border-[#AC6AFF]"
          />

          <div className="mt-[18px]">
            <Slider 
              className="" 
              sliderValue = {sliderAVal}
              setSliderValue={setSliderAVal}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[30%_auto] mt-[20px]">
        <div>
          <Typography
            variant="heading"
            className="!font-aeonik-pro !text-[#FCFCFC] ps-[30%] mt-1"
            label={tokenBInfo.tokenBalanceInfo.symbol}
          />
        </div>
        <div className="w-[70%]">
          <TextInput
            value={tokenBInput}
            id="oo"
            rounded
            onChange={(e) => {
              if (validNumber.test(e.target.value)) {
                setTokenBInput(e.target.value);
              }
            }}
            rightComponent={
              <div className="flex h-full  py-2 items-center justify-center cursor-pointer" onClick={
                (e) => {
                  setTokenBInput(tokenBBalance);
                  setSliderBVal(100);
                }}>
                <div className="h-full w-[1px] bg-secondary"></div>
                <Typography
                  variant="body0.5"
                  className="!font-inter ml-[10px] mr-[14px] text-secondary"
                  label="MAX"
                />
              </div>
            }
            className="focus:outline-none w-full focus:border-[#AC6AFF] !border-[#AC6AFF]"
          />
          <div className="mt-[18px]">
            <Slider 
              className="" 
              sliderValue = {sliderBVal}
              setSliderValue={setSliderBVal}
            />
          </div>
        </div>
      </div>

      <div className="w-[80%] mt-[35px] mb-[28px] mx-auto">
        <div className="flex items-center mb-[28px]">
          {/* <div className="mr-9">
            <Typography
              label="Lockup Period"
              variant="body2"
              className="!font-inter"
            />
          </div>
          <div className="inline-block">
            <TextInput
              id="lock-period"
              className="!rounded-full !font-[14px] !text-bold !font-inter text-[#DE1EFD]"
              // type="number"
            />
          </div> */}

          {/* <Select
            id="lock-period"
            className="whitespace-nowrap px-3 !font-inter font-bold !text-[#DE1EFD] !rounded-full"
            options={[{ title: "No Lock" }]}
          /> */}
        </div>
        <Button
          className="w-full"
          label="Deposit"
          rounded
          theme="secondary-solid"
          disabled={status}
          onClick={onHandleDeposit}
        />
      </div>
    </div>
  );
}
