import Button from "@/components/button";
import Typography from "@/components/typography";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Ankr, ArrowUp, BnB, Curve, Dai, Usdc, Usdt } from "@/components/icons";
import TextInput from "@/components/input";
import Slider from "@/components/slider";
import ActivityChart from "./activityChart";
import { Address, useBalance, usePublicClient, useWalletClient } from "wagmi";
import FortunnaPoolABI from "@/assets/FortunnaPool.json";
import FortunnaToken from "@/assets/FortunnaToken.json";
import FortunnaTokenABI from "@/assets/FortunnaToken.json";
import { BalanceShowDecimals, PoolCollection, TOAST_MESSAGE, TokenInfos } from "@/constants";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { convertUnderDecimals } from "@/utils";
import { ethers } from "ethers";
// import FarmActionModal from "./actionModal";

const activeTokenData = [
  {
    value: "1000 DAI",
    icon: <Dai />,
  },
  {
    value: "950 USDC",
    icon: <Usdc />,
  },
  {
    value: "11085 USDT",
    icon: <Usdt />,
  },
];

const Assets = () => {
  return (
    <div>
      {activeTokenData.map((token, index) => {
        return (
          <div
            className={`flex items-center ${index ? "mt-2" : null} `}
            key={index}
          >
            {token.icon}
            <Typography
              label={token.value}
              className="!font-inter !text-secondary ml-2"
              variant="body3"
            />
          </div>
        );
      })}
    </div>
  );
};
export default function PoolList({
  pool,
  onStake,
  active,
  onOpenActionModal,
  onSetTokenAInfo,
  onSetTokenBInfo,
  onSelectedIndex,
}: {
  pool: PoolCollection
  onStake: React.MouseEventHandler<HTMLButtonElement>,
  active: boolean,
  onOpenActionModal : () => void,
  onSetTokenAInfo: (x?: TokenInfos) => void,
  onSetTokenBInfo: (x?: TokenInfos) => void,
  onSelectedIndex: (x?: any) => void
}) {
  
  const {data:walletClient} = useWalletClient();
  const publicClient = usePublicClient();
  const [tokenAAddress, setTokenAAddress] = useState<string>("");
  const [tokenBAddress, setTokenBAddress] = useState<string>("");
  const [tokenAStakeBalance, setTokenAStakeBalance] = useState<string>("0");
  const [tokenBStakeBalance, setTokenBStakeBalance] = useState<string>("0");
  const [tokenARewardBalance, setTokenARewardBalance] = useState<string>("0");
  const [tokenBRewardBalance, setTokenBRewardBalance] = useState<string>("0");
  const [minStakeAmount, setMinStakeAmount] = useState<string[]>([]);
  const [maxStakeAmount, setMaxStakeAmount] = useState<string[]>([]);
  const [stakingToken, setStakingToken] = useState<string>("");
  const [rewardToken, setRewardToken] = useState<string>("");
  const [rewardBalance, setRewardBalance] = useState<number>(0);
  const [rewardStatus, setRewardStatus] = useState<boolean>(false);
  
  const {data: tokenABalance} = useBalance({
    token: tokenAAddress as Address,
    address:walletClient?.account.address,
    watch: true
  });

  const {data: tokenBBalance} = useBalance({
    token: tokenBAddress as Address,
    address:walletClient?.account.address,
    watch: true
  });
  
  const {data: stakeLPBalance} = useBalance({
    token: stakingToken as Address,
    address:walletClient?.account.address,
    watch: true
  });
  
  const rewardLPBalance = useBalance({
    token: rewardToken as Address,
    address:walletClient?.account.address,
    watch: true
  });

  const readTokensInfo = async () => {
    
    const staking_Token:any = await publicClient.readContract( {
      address: pool.address as Address,
      abi: FortunnaPoolABI,
      functionName: "stakingToken"
    });

    const reward_Token:any = await publicClient.readContract( {
      address: pool.address as Address,
      abi: FortunnaPoolABI,
      functionName: "rewardToken"
    });

    const scalar_Params:any = await publicClient.readContract( {
      address: pool.address as Address,
      abi: FortunnaPoolABI,
      functionName: "scalarParams"
    });

    if (scalar_Params.length > 0) {
      const [minAAmount, minBAmount] = await readMin_MaxAmount(staking_Token, scalar_Params[3]);
      const [maxAMounnt, maxBAmount] = await readMin_MaxAmount(staking_Token, scalar_Params[4]);
      setMinStakeAmount([minAAmount, minBAmount]);
      setMaxStakeAmount([maxAMounnt, maxBAmount]);
    }
    setStakingToken(staking_Token);
    setRewardToken(reward_Token);

    const tokenA_Address:any = await publicClient.readContract( {
      address: staking_Token as Address,
      abi: FortunnaToken,
      functionName: "underlyingTokens",
      args:[
        0
      ]
    });

    const tokenB_Address:any = await publicClient.readContract( {
      address: staking_Token as Address,
      abi: FortunnaToken,
      functionName: "underlyingTokens",
      args:[
        1
      ]
    });

    setTokenAAddress(tokenA_Address);
    setTokenBAddress(tokenB_Address);

  }

  const readMin_MaxAmount = async(tokenAddress:string, amount: string) => {

    const tokenA_Amount:any = await publicClient.readContract( {
      address: tokenAddress as Address,
      abi: FortunnaToken,
      functionName: "calcUnderlyingTokensInOrOutPerFortunnaToken",
      args:[
        0,
        amount
      ]
    });

    const tokenB_Amount:any = await publicClient.readContract( {
      address: tokenAddress as Address,
      abi: FortunnaToken,
      functionName: "calcUnderlyingTokensInOrOutPerFortunnaToken",
      args:[
        1,
        amount
      ]
    });

    return [tokenA_Amount, tokenB_Amount];
  }

  const readStaking_RewardInfo = async (tokenAddress: string, stake_reward: boolean) => {

    let lpAmount = 0;
    const res:any = await publicClient.readContract( {
      address: pool.address as Address,
      abi: FortunnaPoolABI,
      functionName: "usersInfo",
      args:[
        walletClient?.account.address
      ]
    });
    
    if (stake_reward) {
      lpAmount = res[0];
    } else {
      lpAmount = res[1];
      setRewardBalance(lpAmount);
    }
    const tokenA_Balance:any = await publicClient.readContract( {
      address: tokenAddress as Address,
      abi: FortunnaToken,
      functionName: "calcUnderlyingTokensInOrOutPerFortunnaToken",
      args:[
        0,
        lpAmount
      ]
    });

    const tokenB_Balance:any = await publicClient.readContract( {
      address: tokenAddress as Address,
      abi: FortunnaToken,
      functionName: "calcUnderlyingTokensInOrOutPerFortunnaToken",
      args:[
        1,
        lpAmount
      ]
    });
    // console.log('tokenA_Balance', tokenA_Balance);
    // console.log('tokenB_Balance', tokenB_Balance);

    if (stake_reward) {
      setTokenAStakeBalance(tokenA_Balance);
      setTokenBStakeBalance(tokenB_Balance);
    } else {
      setTokenARewardBalance(tokenA_Balance);
      setTokenBRewardBalance(tokenB_Balance);
    }

  }

  const onGetReward = async() => {

    const txReward:any = await walletClient!.writeContract({
      address: pool.address as Address,
      abi: FortunnaPoolABI,
      functionName: "getReward"
    });

    const confirmation = await publicClient.waitForTransactionReceipt({
      hash:txReward,
      timeout:100000
    });
    
    console.log("reward confirm", confirmation);
    
    return BigInt(confirmation.logs[1].data).toString(10);

  }

  const onBurnReward = async (amount:any) => {

    const txBurn:any = await walletClient!.writeContract({
      address: rewardToken as Address,
      abi: FortunnaTokenABI,
      functionName: "burn",
      args:[
        walletClient?.account.address,
        amount
      ]
    });
  
    const confirmation = await publicClient.waitForTransactionReceipt({
      hash:txBurn,
      timeout:100000
    });

    console.log('burn confirm', confirmation);
  }

  useEffect(() => {
    if (!walletClient?.chain)
      return;
    if (active) {
      readTokensInfo();
    }
  }, [active]);

  useEffect(() => {
    if (!walletClient?.chain)
      return;
    if (stakingToken) {
      readStaking_RewardInfo(stakingToken, true);
    }
    if (rewardToken)
      readStaking_RewardInfo(rewardToken, false);
  }, [tokenABalance, tokenBBalance, stakeLPBalance, rewardLPBalance])

  const onHandleDepositActionModal = (event: any) => {
    if (!walletClient?.chain)
      return;

    onSelectedIndex(0);
    onHandleActionModal(event);
  }

  const onHandleWithdrawActionModal = (event: any) => {
    if (!walletClient?.chain)
      return;

    onSelectedIndex(1);
    onHandleActionModal(event);
  }

  const onHandleActionModal = (event:any) => {

    const tokenAInfo = {
      tokenAddress: tokenAAddress,
      tokenBalanceInfo: tokenABalance,
      tokenStakeBalance: tokenAStakeBalance,
      tokenRewardBalance: tokenARewardBalance,
      stakeTokenAddress: stakingToken,
      rewardTokenAddress: rewardToken,
      minStakeAmount: minStakeAmount[0],
      maxStakeAmount: maxStakeAmount[0]
    } as TokenInfos;

    const tokenBInfo = {
      tokenAddress: tokenBAddress,
      tokenBalanceInfo: tokenBBalance,
      tokenStakeBalance: tokenBStakeBalance,
      tokenRewardBalance: tokenBRewardBalance,
      stakeTokenAddress: stakingToken,
      rewardTokenAddress: rewardToken,
      minStakeAmount: minStakeAmount[1],
      maxStakeAmount: maxStakeAmount[1]

    } as TokenInfos;

    onSetTokenAInfo(tokenAInfo);
    onSetTokenBInfo(tokenBInfo);
    onOpenActionModal();
  }

  const onClaimReward = async (event:any) => {

    setRewardStatus(true);
    try {
      const amount = await onGetReward();

      console.log('reward amount', amount);

      await onBurnReward(amount);

      toast.success(TOAST_MESSAGE.TRANSACTION_SUBMITTED, {
        position: toast.POSITION.TOP_CENTER
      });
    } catch(ex){
      console.log('ex', ex);
      toast.error(TOAST_MESSAGE.UNEXPECTED_ERROR, {
        position: toast.POSITION.TOP_CENTER
      });
    }

    setRewardStatus(false);
  }
  const Assets = ({
    tokenA, 
    tokenB
  }: {
    tokenA: string, 
    tokenB: string
  }) => {
    return (
      <div>
        <div
            className="flex items-center mt-2"
          >
              <Usdc />
              <Typography
                label={tokenA}
                className="!font-inter !text-secondary ml-2"
                variant="body3"
              />
        </div>
        <div
            className="flex items-center mt-2"
          >
              <Usdt />
              <Typography
                label={tokenB}
                className="!font-inter !text-secondary ml-2"
                variant="body3"
              />
        </div>
      </div>
    );
  };
  
  const [value, setValue] = useState<number>(0);
  return (
    <div
      style={{ backgroundColor: "rgba(27, 28, 32, 0.6)" }}
      className="lg:p-[32px] p-[20px]"
    >
      <div className="lg:flex lg:flex-row justify-between">
        <div className="lg:w-[70%]">
          <div className="flex flex-row items-center">
            <div className="flex mr-4">
              <div>
                <BnB />
              </div>
            </div>
            <Typography variant="subtitle" label={pool.name} />
          </div>

          <div className="lg:grid lg:grid-cols-4 gap-10 mt-[32px] ">
            <div>
              {" "}
              <Typography
                variant="body3"
                className="!font-poppins-light text-light-2"
                label="Platform"
              />
              <div className="flex items-center mt-2">
                <Ankr />
                <Typography
                  variant="heading"
                  className="ml-[8px] !font-poppins-semi-bold"
                  label="Ankr"
                />
              </div>
            </div>
            <div className="md:my-0 my-4">
              <Typography
                variant="body3"
                className="!font-poppins-light text-light-2"
                label="Apy"
              />
              <div className="mt-2 flex items-center">
                <div className="bg-success-3  mr-[8px]  items-center inline-block w-[26px] h-[16px] rounded-[5px]">
                  <div className="flex ] items-center justify-center">
                    <ArrowUp />
                  </div>
                </div>

                <Typography
                  variant="heading"
                  className="!font-poppins-semi-bold"
                  label="5%"
                />
              </div>
            </div>
            <div>
              <Typography
                variant="body3"
                className="!font-poppins-light text-light-2"
                label="Volume"
              />
              <Typography
                variant="heading"
                className="!font-poppins-semi-bold mt-2"
                label="$15,000,000"
              />
            </div>
            <div>
              <Typography
                variant="body3"
                className="!font-poppins-light text-light-2 whitespace-nowrap"
                label="Total Value Locked"
              />
              <Typography
                variant="heading"
                className="!font-poppins-semi-bold mt-2"
                label="$500,000,000"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="md:block flex ">
            <Button
              theme="secondary"
              onClick={onStake}
              label="Stake"
              rightComponent={
                <svg
                  className="ms-1"
                  width="11"
                  height="10"
                  viewBox="0 0 11 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_51_30003)">
                    <path
                      d="M0.705078 5.3125L5.39258 0.625M5.39258 0.625H0.705078M5.39258 0.625V5.3125"
                      stroke="#FCFCFC"
                      stroke-width="0.9375"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_51_30003">
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
              className="!font-poppins-light md:mr-0 mr-3 md:w-[170px]"
            />
          </div>
        </div>
      </div>
      {active ? (
        <div className="lg:grid lg:grid-cols-[30%_auto] lg:gap-16 mt-[60px]">
          <div>
            <ActivityChart />
          </div>
          <div className="lg:grid lg:grid-cols-3 lg:gap-14">
            <div>
              <Typography
                className="!font-inter mb-1"
                variant="body1"
                label="Wallet Balance"
              />
              <Assets 
                  tokenA = {!tokenAAddress || !tokenABalance ? "--" : convertUnderDecimals(ethers.formatUnits(tokenABalance!.value, tokenABalance?.decimals), BalanceShowDecimals.FARM_SHOW_BALANCE) + " " + tokenABalance?.symbol}
                  tokenB = {!tokenBAddress || !tokenBBalance ? "--" : convertUnderDecimals(ethers.formatUnits(tokenBBalance!.value, tokenBBalance?.decimals), BalanceShowDecimals.FARM_SHOW_BALANCE) + " " + tokenBBalance?.symbol}
                />

                <Button
                  className="w-full mt-9"
                  size="small"
                  onClick={onHandleDepositActionModal}
                  rounded
                  theme="secondary-solid"
                  disabled = {tokenAAddress && tokenBAddress && tokenABalance && tokenABalance?.value > 0 ?false:true}
                  label="Deposit"
                />
              {/* <Typography
                className="!font-inter !text-secondary "
                variant="body3"
                label="13.65 BNB"
              />

              <div className="mt-[30px]">
                <TextInput
                  rightComponent={
                    <div className="flex h-full  py-2 items-center justify-center">
                      <div className="h-full w-[1px] bg-secondary"></div>
                      <Typography
                        variant="body0.5"
                        className="!font-inter ml-[10px] mr-[14px] text-secondary"
                        label="MAX"
                      />
                    </div>
                  }
                  id="#id"
                  rounded
                  className="!w-full"
                  placeholder="Enter amount"
                />
                <div className="mt-[16px]">
                  <Slider className="w-full" sliderValue={value} setSliderValue={setValue}/>
                </div> 
              </div>
              <Button
                className="w-full mt-[19px]"
                size="small"
                rounded
                theme="secondary-solid"
                label="Deposit"
              />*/}
            </div>
            <div>
              <Typography
                className="!font-inter mb-2"
                variant="body1"
                label="Available Balance"
              />
              <Assets 
                  tokenA = {!stakingToken ? "--" : convertUnderDecimals(ethers.formatUnits(tokenAStakeBalance, tokenABalance?.decimals), BalanceShowDecimals.FARM_SHOW_BALANCE)  + " " + tokenABalance?.symbol}
                  tokenB = {!stakingToken ? "--" : convertUnderDecimals(ethers.formatUnits(tokenBStakeBalance, tokenBBalance?.decimals), BalanceShowDecimals.FARM_SHOW_BALANCE) + " " + tokenBBalance?.symbol}
                />
                <Button
                  className="w-full mt-9"
                  size="small"
                  rounded
                  theme="secondary-solid"
                  onClick={onHandleWithdrawActionModal}
                  disabled = {parseFloat(tokenAStakeBalance) > 0 || parseFloat(tokenBStakeBalance) > 0?false:true}
                  label="Withdraw"
                />
              {/* <Typography
                className="!font-inter !text-secondary "
                variant="body3"
                label="13.65 BNB"
              />

              <div className="mt-[30px]">
                <TextInput
                  rightComponent={
                    <div className="flex h-full  py-2 items-center justify-center">
                      <div className="h-full w-[1px] bg-secondary"></div>
                      <Typography
                        variant="body0.5"
                        className="!font-inter ml-[10px] pr-[14px] text-secondary"
                        label="MAX"
                      />
                    </div>
                  }
                  id="#id"
                  rounded
                  className="!w-full"
                  placeholder="Enter amount"
                />
                <div className="mt-[16px]">
                  <Slider className="w-full" sliderValue={value} setSliderValue={setValue} />
                </div>
              </div>
              <Button
                className="w-full mt-[19px]"
                size="small"
                rounded
                theme="secondary-solid"
                disabled
                label="Withdraw"
              /> */}
            </div>
            <div className="lg:my-0 my-10">
              <Typography
                className="!font-inter mb-2"
                variant="body1"
                label="Current Rewards"
              />
              <Assets 
                  tokenA = {!rewardToken ? "--" : convertUnderDecimals(ethers.formatUnits(tokenARewardBalance, tokenABalance?.decimals), BalanceShowDecimals.FARM_SHOW_BALANCE) + " " + tokenABalance?.symbol}
                  tokenB = {!rewardToken ? "--" : convertUnderDecimals(ethers.formatUnits(tokenBRewardBalance, tokenBBalance?.decimals), BalanceShowDecimals.FARM_SHOW_BALANCE) + " " + tokenBBalance?.symbol}
                />
                <Button
                  className="w-full mt-9"
                  size="small"
                  onClick={onClaimReward}
                  rounded
                  theme="secondary-solid"
                  disabled = {rewardStatus || rewardBalance == 0?true:false}
                  label="Claim Rewards"
                />
              {/* <Typography
                className="!font-inter !text-secondary "
                variant="body3"
                label="13.65 BNB"
              />

              <div className="mt-[30px]">
                <TextInput
                  rightComponent={
                    <div className="flex h-full  py-2 items-center justify-center">
                      <div className="h-full w-[1px] bg-secondary"></div>
                      <Typography
                        variant="body0.5"
                        className="!font-inter ml-[10px] pr-[14px] text-secondary"
                        label="MAX"
                      />
                    </div>
                  }
                  id="#id"
                  className="!w-full"
                  rounded
                  placeholder="Enter amount"
                />
                <div className="mt-[16px]">
                  <Slider className="w-full" sliderValue={value} setSliderValue={setValue} />
                </div>
              </div>
              <Button
                className="w-full mt-[19px]"
                size="small"
                rounded
                theme="secondary-solid"
                disabled
                label="Claim Rewards"
              /> */}
            </div>
          </div>
        </div>
      ) : null}

      {/* <FarmActionModal /> */}
    </div>
  );
}
