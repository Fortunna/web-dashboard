import Card from "@/components/card";
import PageWrapper from "@/components/pageWrapper";
import Stepper from "@/components/stepper";
import Typography from "@/components/typography";
import DashboardLayout from "@/layouts";
import CreateFarmPayment from "@/modules/farm/payment";
import FarmInformation from "@/modules/farm/farm-information";
import FarmParameters from "@/modules/farm/farm-parameters";
import CreateFarmReview from "@/modules/farm/farmReviewSubmit";
import CreateFarmReward from "@/modules/farm/reward";
import React, { useState } from "react";
import { toBytes } from "viem";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

const steeperHeader = [
  {
    title: "Pool Informations",
    key: "informations",
  },
  {
    title: "Pool Parameters",
    key: "parameters",
  },
  {
    title: "Reward",
    key: "reward",
  },
  {
    title: "Payment",
    key: "payment",
  },
  {
    title: "Review and Submit",
    key: "review",
  },
];
export default function Create() {
  const [isActiveSteeper, setActiveSteeper] = useState(steeperHeader[0].key);

  const [protoPoolIdx, setProtoPoolIdx] = React.useState(0);
  const [startTimestamp, setStartTimestamp] = React.useState(0);
  const [endTimestamp, setEndTimestamp] = React.useState(0);
  const [minStakeAmount, setMinStakeAmount] = React.useState(0);
  const [maxStakeAmount, setMaxStakeAmount] = React.useState(0);
  const [minLockUpRewardsPeriod, setMinLockUpRewardsPeriod] = React.useState(0);
  const [earlyWithdrawalFeeBasePoints, setEarlyWithdrawalFeeBasePoints] =
    React.useState(0);
  const [depositWithdrawFeeBasePoints, setDepositWithdrawFeeBasePoints] =
    React.useState(0);
  const [
    totalRewardBasePointsPerDistribution,
    setTotalRewardBasePointsPerDistribution,
  ] = React.useState(0);

  const [stakingTokensMask, setStakingTokensMask] = React.useState(
    toBytes("0x00000000000000000000000000000000000000000000000000000000000000")
  );
  const [rewardTokensMask, setRewardTokensMask] = React.useState(
    toBytes("0x00000000000000000000000000000000000000000000000000000000000000")
  );
  const [rawStakingTokensMask, setRawStakingTokensMask] = React.useState([]);
  const [rawRewardTokensMask, setRawRewardTokensMask] = React.useState([]);

  let nonfungiblePositionManager;
  let setNonfungiblePositionManager;

  //  if (isUniswapOrClassic) {
  //    [nonfungiblePositionManager, setNonfungiblePositionManager] =
  //      React.useState("");
  //  }

  const [utilizingTokens, setUtilizingTokens] = React.useState(["", ""]);
  const [initialRewardAmounts, setInitialRewardAmounts] = React.useState([
    ["", ""],
  ]);
  const [initialDepositAmounts, setInitialDepositAmounts] = React.useState([
    ["", ""],
  ]);

  // const {
  //   config,
  //   error: prepareError,
  //   isError: isPrepareError,
  // } = usePrepareContractWrite({
  //   address: "factoryAddress",
  //   abi: "fortunnaFactoryAbi",
  //   functionName: "createPool",
  //   args: [
  //     [
  //       parseInt(protoPoolIdx),
  //       parseInt(startTimestamp),
  //       parseInt(endTimestamp),
  //       minStakeAmount,
  //       maxStakeAmount,
  //       parseInt(minLockUpRewardsPeriod),
  //       parseInt(earlyWithdrawalFeeBasePoints),
  //       parseInt(depositWithdrawFeeBasePoints),
  //       totalRewardBasePointsPerDistribution,
  //       stakingTokensMask,
  //       rewardTokensMask,
  //       [nonfungiblePositionManager],
  //     ],
  //     [utilizingTokens, initialRewardAmounts, initialDepositAmounts],
  //   ],
  //   enabled: true,
  // });

  // const { data, error, isError, write } = useContractWrite(config);

  // const { isLoading, isSuccess } = useWaitForTransaction({
  //   hash: data?.hash,
  // });

  return (
    <div>
      <DashboardLayout>
        <PageWrapper>
          <>
            <Typography
              label="Create Farm"
              variant="title"
              className="mb-[20px]"
            />
            <Stepper current={isActiveSteeper} headers={steeperHeader}>
              <FarmInformation
                onNext={() => {
                  setActiveSteeper(steeperHeader[1].key);
                }}
              />
              <FarmParameters
                onNext={() => {
                  setActiveSteeper(steeperHeader[2].key);
                }}
                onPrevious={() => {
                  setActiveSteeper(steeperHeader[0].key);
                }}
                values={{
                  setMinStakeAmount,
                  minStakeAmount,
                  setMaxStakeAmount,
                  maxStakeAmount,
                }}
              />
              <CreateFarmReward
                onNext={() => {
                  setActiveSteeper(steeperHeader[3].key);
                }}
                onPrevious={() => {
                  setActiveSteeper(steeperHeader[1].key);
                }}
              />
              <CreateFarmPayment
                onNext={() => {
                  setActiveSteeper(steeperHeader[4].key);
                }}
                onPrevious={() => {
                  setActiveSteeper(steeperHeader[2].key);
                }}
              />
              <CreateFarmReview
                onPrevious={() => {
                  setActiveSteeper(steeperHeader[3].key);
                }}
              />
            </Stepper>
          </>
        </PageWrapper>
      </DashboardLayout>
    </div>
  );
}
