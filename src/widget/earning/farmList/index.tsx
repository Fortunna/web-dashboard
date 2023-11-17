import Button from "@/components/button";
import Typography from "@/components/typography";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUp, Curve, Dai, ETH, Usdc, Usdt, WETH } from "@/components/icons";
import ActivityChart from "./activityChart";
import FarmActionModal from "./actionModal";
import FortunnaPoolABI from "@/assets/FortunaUniswapV3Pool.json";
import FortunnaToken from "@/assets/FortunnaToken.json";
import { Address, useBalance, usePublicClient, useWalletClient } from "wagmi";
import { ethers } from "ethers";
import FortunnaTokenABI from "@/assets/FortunnaToken.json";
import {
  BalanceShowDecimals,
  EXLORESCAN_ADDRESS,
  PoolCollection,
  SupportedChains,
  TOAST_MESSAGE,
  TokenInfos,
} from "@/constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { convertUnderDecimals } from "@/utils";
import AppLogo, { FTA, FTB } from "@/components/logo";
import Link from "next/link";
import { data } from "autoprefixer";
import { RenderAsset } from "@/data/assets";

export default function FarmList({
  active,
  pool,
  onOpenActionModal,
  onJoinPool,
  onSetTokenAInfo,
  onSetTokenBInfo,
  onSelectedIndex,
}: {
  active: boolean;
  pool: PoolCollection;
  onOpenActionModal: () => void;
  onJoinPool: () => void;
  onSetTokenAInfo: (x?: TokenInfos) => void;
  onSetTokenBInfo: (x?: TokenInfos) => void;
  onSelectedIndex: (x?: any) => void;
}) {
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const [tokenAAddress, setTokenAAddress] = useState<string>("");
  const [tokenBAddress, setTokenBAddress] = useState<string>("");
  const [tokenAStakeBalance, setTokenAStakeBalance] = useState<string>("0");
  const [tokenBStakeBalance, setTokenBStakeBalance] = useState<string>("0");
  const [tokenARewardBalance, setTokenARewardBalance] = useState<string>("0");
  const [tokenBRewardBalance, setTokenBRewardBalance] = useState<string>("0");
  const [rewardToken, setRewardToken] = useState<string>("");
  const [rewardBalance, setRewardBalance] = useState<number>(0);
  const [rewardStatus, setRewardStatus] = useState<boolean>(false);
  const [href, setHref] = useState<string>(
    "https://goerli.etherscan.io/address/" + pool.address
  );

  const { data: tokenABalance } = useBalance({
    token: tokenAAddress as Address,
    address: walletClient?.account.address,
    watch: true,
  });

  const { data: tokenBBalance } = useBalance({
    token: tokenBAddress as Address,
    address: walletClient?.account.address,
    watch: true,
  });

  const readTokensInfo = async () => {
    const tokenA_Address: any = await publicClient.readContract({
      address: pool.address as Address,
      abi: FortunnaPoolABI,
      functionName: "tokens",
      args: [0],
    });

    const tokenB_Address: any = await publicClient.readContract({
      address: pool.address as Address,
      abi: FortunnaPoolABI,
      functionName: "tokens",
      args: [1],
    });

    setTokenAAddress(tokenA_Address);
    setTokenBAddress(tokenB_Address);
  };

  const readRewardAmount = async () => {
    const tokenAReward: any = await publicClient.readContract({
      address: pool.address as Address,
      abi: FortunnaPoolABI,
      functionName: "earned",
      args: [walletClient?.account.address, 0],
    });

    const tokenBReward: any = await publicClient.readContract({
      address: pool.address as Address,
      abi: FortunnaPoolABI,
      functionName: "earned",
      args: [walletClient?.account.address, 1],
    });

    setTokenARewardBalance(tokenAReward);
    setTokenBRewardBalance(tokenBReward);
    setRewardBalance(tokenAReward + tokenBReward);
  };
  const readStaking_RewardInfo = async () => {
    const tokenLP_Balance: any = await publicClient.readContract({
      address: pool.address as Address,
      abi: FortunnaPoolABI,
      functionName: "depositOf",
      args: [walletClient?.account.address],
    });

    setTokenAStakeBalance(tokenLP_Balance.toString());
    setTokenBStakeBalance(tokenLP_Balance.toString());
  };

  const onGetReward = async () => {
    const txReward: any = await walletClient!.writeContract({
      address: rewardToken as Address,
      abi: FortunnaTokenABI,
      functionName: "getReward",
    });

    const confirmation = await publicClient.waitForTransactionReceipt({
      hash: txReward,
      timeout: 100000,
    });

    console.log("getReward confirm", confirmation);
  };

  useEffect(() => {
    if (!walletClient?.chain) return;
    if (active) {
      readTokensInfo();
    }
    setHref(
      EXLORESCAN_ADDRESS[walletClient?.chain.id! as SupportedChains] +
      pool.address
    );
  }, [active, walletClient?.chain]);

  useEffect(() => {
    if (!walletClient?.chain) return;

    readRewardAmount();
    readStaking_RewardInfo();
  }, [tokenABalance, tokenBBalance]);

  const chart = useMemo(() => {
    return <ActivityChart />
  }, []);

  const onHandleDepositActionModal = (event: any) => {
    if (!walletClient?.chain) return;

    onSelectedIndex(0);
    onHandleActionModal(event);
  };

  const onHandleWithdrawActionModal = (event: any) => {
    if (!walletClient?.chain) return;

    onSelectedIndex(1);
    onHandleActionModal(event);
  };

  const onHandleActionModal = (event: any) => {
    const tokenAInfo = {
      tokenAddress: tokenAAddress,
      tokenBalanceInfo: tokenABalance,
      tokenStakeBalance: tokenAStakeBalance,
      tokenRewardBalance: tokenARewardBalance,
      stakeTokenAddress: pool.address,
      rewardTokenAddress: "",
      minStakeAmount: "0",
      maxStakeAmount: tokenABalance?.value.toString(),
    } as TokenInfos;

    const tokenBInfo = {
      tokenAddress: tokenBAddress,
      tokenBalanceInfo: tokenBBalance,
      tokenStakeBalance: tokenBStakeBalance,
      tokenRewardBalance: tokenBRewardBalance,
      stakeTokenAddress: pool.address,
      rewardTokenAddress: "",
      minStakeAmount: "0",
      maxStakeAmount: tokenBBalance?.value.toString(),
    } as TokenInfos;

    onSetTokenAInfo(tokenAInfo);
    onSetTokenBInfo(tokenBInfo);
    onOpenActionModal();
  };

  const onClaimReward = async (event: any) => {
    setRewardStatus(true);
    try {
      const amount = await onGetReward();

      console.log("reward amount", amount);

      toast.success(TOAST_MESSAGE.TRANSACTION_SUBMITTED, {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (ex) {
      console.log("ex", ex);
      toast.error(TOAST_MESSAGE.UNEXPECTED_ERROR, {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    setRewardStatus(false);
  };
  const Assets = ({ tokenA, tokenB }: { tokenA: string; tokenB: string }) => {
    return (
      <div>
        <div className="flex items-center mt-2">
          <RenderAsset
            className="ms-3 mr-2 !w-8 !h-8"
            type={tokenABalance?.symbol}
          />

          <Typography
            label={tokenA}
            className="!font-inter !text-secondary ml-2"
            variant="body3"
          />
        </div>
        <div className="flex items-center mt-2">
          <RenderAsset
            className="ms-3 mr-2 !w-8 !h-8"
            type={tokenBBalance?.symbol ?? ""}
          />

          <Typography
            label={tokenB}
            className="!font-inter !text-secondary ml-2"
            variant="body3"
          />
        </div>
      </div>
    );
  };

  const _item: any = {
    "FTA/ETH pair": [FTA, ETH],
    "FTB/FTA pair": [FTB, FTA],
  };

  // console.log(_item[pool.name.trim()], "kkssksksk");

  return (
    <div
      style={{ backgroundColor: "rgba(27, 28, 32, 0.6)" }}
      className="lg:p-[32px] p-[20px]"
    >
      <div className="lg:flex lg:flex-row justify-between">
        <div className="lg:w-[70%]">
          <div className="flex flex-row items-center">
            <div className={`flex mr-4 `}>
              {_item[pool.name.trim()].map((Component: any, key: number) => {
                return (
                  <div className="-ms-3" key={key}>
                    {<Component className="!w-9 h-auto" key={key} />}
                  </div>
                );
              })}
            </div>

            <Link href={href} target="_blank">
              <Typography variant="subtitle" label={pool.name} />
            </Link>
          </div>

          <div className="grid lg:grid-cols-4  grid-cols-2  gap-10 mt-[32px] ">
            <div className="md:mb-0">
              {" "}
              <Typography
                variant="body3"
                className="!font-poppins-light text-light-2"
                label="Platform"
              />
              <div className="flex items-center mt-2">
                <FTA className="!w-7 h-auto" />
                <Typography
                  variant="heading"
                  className="ml-[8px] !font-poppins-semi-bold"
                  label="Fortuna"
                />
              </div>
            </div>
            <div className="md:mb-0">
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
                  label="Custom"
                />
              </div>
            </div>
            <div className="md:mb-0">
              <Typography
                variant="body3"
                className="!font-poppins-light text-light-2"
                label="Volume"
              />
              <Typography
                variant="heading"
                className="!font-poppins-semi-bold mt-2"
                label="-"
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
                label="-"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center md:mt-0 mt-10">
          <div className="md:block flex ">
            <Button
              theme="secondary"
              onClick={onJoinPool}
              label="Join Pool"
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
        <>
          <div className="lg:grid lg:grid-cols-[30%_auto] lg:gap-16 md:mt-[60px] mt-[40px]">
            <div className=" md:mb-0 mb-10">
              {chart}
            </div>
            <div className="grid lg:grid-cols-3 lg:gap-14">
              <div className="md:mb-0 mb-8 relative overflow-hidden">
                <Typography
                  className="!font-inter mb-2"
                  variant="body1"
                  label="Current Balance"
                />
                <Assets
                  tokenA={
                    !tokenAAddress || !tokenABalance
                      ? "--"
                      : convertUnderDecimals(
                        ethers.formatUnits(
                          tokenABalance!.value,
                          tokenABalance?.decimals
                        ),
                        BalanceShowDecimals.FARM_SHOW_BALANCE
                      ) +
                      " " +
                      tokenABalance?.symbol
                  }
                  tokenB={
                    !tokenBAddress || !tokenBBalance
                      ? "--"
                      : convertUnderDecimals(
                        ethers.formatUnits(
                          tokenBBalance!.value,
                          tokenBBalance?.decimals
                        ),
                        BalanceShowDecimals.FARM_SHOW_BALANCE
                      ) +
                      " " +
                      tokenBBalance?.symbol
                  }
                />

                <Button
                  className="w-full mt-9"
                  size="small"
                  onClick={onHandleDepositActionModal}
                  rounded
                  theme="secondary-solid"
                  disabled={
                    tokenAAddress &&
                      tokenBAddress &&
                      tokenABalance &&
                      tokenABalance?.value > 0
                      ? false
                      : true
                  }
                  label="Deposit"
                />
              </div>
              <div className="relative overflow-hidden">
                <Typography
                  className="!font-inter mb-2"
                  variant="body1"
                  label="Available Balance"
                />

                <Assets
                  tokenA={
                    !tokenAStakeBalance
                      ? "--"
                      : convertUnderDecimals(
                        ethers.formatUnits(
                          tokenAStakeBalance,
                          tokenABalance?.decimals
                        ),
                        BalanceShowDecimals.FARM_SHOW_BALANCE
                      ) +
                      " " +
                      tokenABalance?.symbol
                  }
                  tokenB={
                    !tokenBStakeBalance
                      ? "--"
                      : convertUnderDecimals(
                        ethers.formatUnits(
                          tokenBStakeBalance,
                          tokenBBalance?.decimals
                        ),
                        BalanceShowDecimals.FARM_SHOW_BALANCE
                      ) +
                      " " +
                      tokenBBalance?.symbol
                  }
                />
                <Button
                  className="w-full mt-9"
                  size="small"
                  rounded
                  theme="secondary-solid"
                  onClick={onHandleWithdrawActionModal}
                  disabled={
                    parseFloat(tokenAStakeBalance) > 0 ||
                      parseFloat(tokenBStakeBalance) > 0
                      ? false
                      : true
                  }
                  label="Withdraw"
                />
              </div>
              <div className="lg:my-0 my-8">
                <Typography
                  className="!font-inter mb-2"
                  variant="body1"
                  label="Current Rewards"
                />
                <Assets
                  tokenA={
                    !tokenARewardBalance
                      ? "--"
                      : convertUnderDecimals(
                        ethers.formatUnits(
                          tokenARewardBalance,
                          tokenABalance?.decimals
                        ),
                        BalanceShowDecimals.FARM_SHOW_BALANCE
                      ) +
                      " " +
                      tokenABalance?.symbol
                  }
                  tokenB={
                    !tokenBRewardBalance
                      ? "--"
                      : convertUnderDecimals(
                        ethers.formatUnits(
                          tokenBRewardBalance,
                          tokenBBalance?.decimals
                        ),
                        BalanceShowDecimals.FARM_SHOW_BALANCE
                      ) +
                      " " +
                      tokenBBalance?.symbol
                  }
                />
                <Button
                  className="w-full mt-9"
                  size="small"
                  onClick={onClaimReward}
                  rounded
                  theme="secondary-solid"
                  disabled={rewardStatus || rewardBalance == 0 ? true : false}
                  label="Claim Rewards"
                />
              </div>
            </div>
          </div>
        </>
      ) : null}

      <FarmActionModal />
    </div>
  );
}
