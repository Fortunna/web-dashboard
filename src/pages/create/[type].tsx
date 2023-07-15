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
import fortunaFactoryAbi from "../../abi/fortunaAbi.json";

import { toBytes } from "viem";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

const steeperHeader = [
  // {
  //   title: "Pool Informations",
  //   key: "informations",
  // },
  {
    title: "Pool Parameters",
    key: "parameters",
  },
  // {
  //   title: "Reward",
  //   key: "reward",
  // },
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

  const factoryAddress = "0xB8e4E0dF38005893CEaf45a7911Fc7DA9Fe50aD1";

  const [protoPoolIdx, setProtoPoolIdx] = React.useState(0);
  const [startTimestamp, setStartTimestamp] = React.useState(0);
  const [endTimestamp, setEndTimestamp] = React.useState(0);
  const [minStakeAmount, setMinStakeAmount] = React.useState(0);
  const [maxStakeAmount, setMaxStakeAmount] = React.useState(0);
  const [minLockUpRewardsPeriod, setMinLockUpRewardsPeriod] = React.useState(0);
  const [earlyWithdrawalFeeBasePoints, setEarlyWithdrawalFeeBasePoints] =
    React.useState(1000);
  const [depositWithdrawFeeBasePoints, setDepositWithdrawFeeBasePoints] =
    React.useState(1000);
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
    [0, "10000000000000000000"],
    [1, "30000000000000000000"],
  ]);
  const [initialDepositAmounts, setInitialDepositAmounts] = React.useState([
    [0, "10000000000000000000"],
    [1, "1500000000000000000"],
  ]);

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: factoryAddress,
    abi: fortunaFactoryAbi,
    functionName: "createPool",
    args: [
      [
        parseInt(protoPoolIdx),
        new Date(startTimestamp).getTime(),
        new Date(endTimestamp).getTime(),
        minStakeAmount,
        maxStakeAmount,
        parseInt(minLockUpRewardsPeriod.toString()),
        parseInt(earlyWithdrawalFeeBasePoints.toString()),
        parseInt(depositWithdrawFeeBasePoints.toString()),
        totalRewardBasePointsPerDistribution,
        stakingTokensMask,
        rewardTokensMask,
        [nonfungiblePositionManager],
      ],
      [utilizingTokens, initialRewardAmounts, initialDepositAmounts],
    ],
    enabled: true,
  });

  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  console.log(prepareError, isError);

  console.log(error, isError, isLoading);
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
              {/* <FarmInformation
                onNext={() => {
                  setActiveSteeper(steeperHeader[1].key);
                }}
              /> */}
              <FarmParameters
                onNext={() => {
                  setActiveSteeper(steeperHeader[1].key);
                }}
                // onPrevious={() => {
                //   setActiveSteeper(steeperHeader[0].key);
                // }}
                values={{
                  setMinStakeAmount,
                  minStakeAmount,
                  setEndTimestamp,
                  startTimestamp,
                  setStartTimestamp,
                  setMinLockUpRewardsPeriod,
                  minLockUpRewardsPeriod,
                  endTimestamp,
                  setMaxStakeAmount,
                  maxStakeAmount,
                }}
              />
              {/* <CreateFarmReward
                onNext={() => {
                  setActiveSteeper(steeperHeader[3].key);
                }}
                onPrevious={() => {
                  setActiveSteeper(steeperHeader[1].key);
                }}
              /> */}
              <CreateFarmPayment
                onNext={() => {
                  setActiveSteeper(steeperHeader[2].key);
                }}
                onPrevious={() => {
                  setActiveSteeper(steeperHeader[1].key);
                }}
              />
              <CreateFarmReview
                onSubmit={() => {
                  write?.();
                }}
                data={[
                  {
                    name: "Pool Name",
                    value: "Fortuna Pool",
                  },
                  // {
                  //   name: "Pool Image URL",
                  //   value: "https://upload.fortuna.io",
                  // },

                  {
                    name: "Start time",
                    value: new Date(startTimestamp).toISOString(),
                  },
                  {
                    name: "End time",
                    value: new Date(endTimestamp).toISOString(),
                  },
                  {
                    name: "Minimum stake amount",
                    value: minStakeAmount.toString(),
                  },
                  {
                    name: "Maximum stake amount",
                    value: maxStakeAmount.toString(),
                  },
                  // {
                  //   name: "Early withdrawal fee (Optional)",
                  //   value: "Yes",
                  // },
                  // {
                  //   name: "% Loss",
                  //   value: "10",
                  // },
                  // {
                  //   name: "% From Deposit/Profit",
                  //   value: "Deposit",
                  // },
                  {
                    name: "Minimum Lock-up Period",
                    value: new Date(minLockUpRewardsPeriod).toISOString(),
                  },
                  ,
                  // {
                  //   name: "Taken in",
                  //   value: "Token A",
                  // },
                  // {
                  //   name: "Reward Token A",
                  //   value: null,
                  //   sub: [
                  //     {
                  //       name: "Reward Quantity",
                  //       value: "0.1",
                  //     },
                  //     {
                  //       name: "Reward Distribution",
                  //       value: "Linear",
                  //     },
                  //     {
                  //       name: "Compounding",
                  //       value: "Yes",
                  //     },
                  //     {
                  //       name: "Reward Distribution Duration",
                  //       value: "Weekly - 7 days",
                  //     },
                  //     {
                  //       name: "Initial Deposit Amount",
                  //       value: "0.01123",
                  //     },
                  //   ],
                  // },
                  // {
                  //   name: "Reward Token B",
                  //   value: null,
                  //   sub: [
                  //     {
                  //       name: "Reward Quantity",
                  //       value: "0.002345",
                  //     },
                  //     {
                  //       name: "Reward Distribution",
                  //       value: "Custom",
                  //     },
                  //     {
                  //       name: "Compounding",
                  //       value: "Yes",
                  //     },
                  //     {
                  //       name: "Reward Distribution Duration",
                  //       value: "Monthly - 30 days",
                  //     },
                  //     {
                  //       name: "Initial Deposit Amount",
                  //       value: "0.21123",
                  //     },
                  //   ],
                  // },
                  {
                    name: "Currency",
                    value: "ETH",
                  },
                ]}
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
