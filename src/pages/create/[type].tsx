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
  useConnect,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { InjectedConnector } from "wagmi/dist/connectors/injected";

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
  // const { connect } = useConnect({
  //   connector: new InjectedConnector(),
  // });

  const { data, isError, isLoading } = useContractRead({
    address: "0xB8e4E0dF38005893CEaf45a7911Fc7DA9Fe50aD1",
    abi: fortunaFactoryAbi,
    functionName: "getPoolAt",
  });
  console.log(data, isError, isLoading, "----");
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
    address: "0xB8e4E0dF38005893CEaf45a7911Fc7DA9Fe50aD1",
    abi: fortunaFactoryAbi,
    functionName: "createPool",
    args: [
      [
        parseInt(protoPoolIdx.toString()),
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

  // const { data, error, isError, write } = useContractWrite(config);

  // const { isLoading, isSuccess } = useWaitForTransaction({
  //   hash: data?.hash,
  // });

  // console.log(prepareError, isError, "lslslsl");

  // console.log(error, isError, isLoading);

  // const { data, isError, isLoading } = usePrepareContractWrite({
  //   address: factoryAddress,
  //   abi: [
  //     {
  //       inputs: [
  //         {
  //           internalType: "address",
  //           name: "_fortunnaTokenPrototype",
  //           type: "address",
  //         },
  //         {
  //           internalType: "address",
  //           name: "_fortunnaPoolPrototype",
  //           type: "address",
  //         },
  //         {
  //           internalType: "address",
  //           name: "_fortunnaPoolUniswapV3Prototype",
  //           type: "address",
  //         },
  //         {
  //           internalType: "address[]",
  //           name: "paymentTokens",
  //           type: "address[]",
  //         },
  //       ],
  //       stateMutability: "nonpayable",
  //       type: "constructor",
  //     },
  //     {
  //       inputs: [{ internalType: "address", name: "entity", type: "address" }],
  //       name: "AddressAlreadyExists",
  //       type: "error",
  //     },
  //     {
  //       inputs: [
  //         { internalType: "uint256", name: "x", type: "uint256" },
  //         { internalType: "uint256", name: "y", type: "uint256" },
  //         { internalType: "string", name: "comment", type: "string" },
  //       ],
  //       name: "AreNotEqual",
  //       type: "error",
  //     },
  //     {
  //       inputs: [{ internalType: "address", name: "account", type: "address" }],
  //       name: "Banned",
  //       type: "error",
  //     },
  //     {
  //       inputs: [
  //         { internalType: "uint256", name: "basePoints", type: "uint256" },
  //         { internalType: "string", name: "comment", type: "string" },
  //       ],
  //       name: "IncorrectBasePoints",
  //       type: "error",
  //     },
  //     {
  //       inputs: [
  //         { internalType: "uint256", name: "start", type: "uint256" },
  //         { internalType: "uint256", name: "finish", type: "uint256" },
  //         { internalType: "string", name: "comment", type: "string" },
  //       ],
  //       name: "IncorrectInterval",
  //       type: "error",
  //     },
  //     {
  //       inputs: [
  //         { internalType: "uint256", name: "length", type: "uint256" },
  //         { internalType: "string", name: "comment", type: "string" },
  //       ],
  //       name: "InvalidLength",
  //       type: "error",
  //     },
  //     {
  //       inputs: [
  //         { internalType: "bytes32", name: "role", type: "bytes32" },
  //         { internalType: "address", name: "entity", type: "address" },
  //       ],
  //       name: "NotAuthorized",
  //       type: "error",
  //     },
  //     {
  //       inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
  //       name: "NotEnoughtPayment",
  //       type: "error",
  //     },
  //     {
  //       inputs: [
  //         { internalType: "uint256", name: "prototypeIndex", type: "uint256" },
  //       ],
  //       name: "UnknownPrototypeIndex",
  //       type: "error",
  //     },
  //     {
  //       anonymous: false,
  //       inputs: [
  //         {
  //           indexed: true,
  //           internalType: "uint256",
  //           name: "amount",
  //           type: "uint256",
  //         },
  //       ],
  //       name: "NativeTokenReceived",
  //       type: "event",
  //     },
  //     {
  //       anonymous: false,
  //       inputs: [
  //         {
  //           indexed: true,
  //           internalType: "address",
  //           name: "pool",
  //           type: "address",
  //         },
  //       ],
  //       name: "PoolCreated",
  //       type: "event",
  //     },
  //     {
  //       anonymous: false,
  //       inputs: [
  //         {
  //           indexed: true,
  //           internalType: "bytes32",
  //           name: "role",
  //           type: "bytes32",
  //         },
  //         {
  //           indexed: true,
  //           internalType: "bytes32",
  //           name: "previousAdminRole",
  //           type: "bytes32",
  //         },
  //         {
  //           indexed: true,
  //           internalType: "bytes32",
  //           name: "newAdminRole",
  //           type: "bytes32",
  //         },
  //       ],
  //       name: "RoleAdminChanged",
  //       type: "event",
  //     },
  //     {
  //       anonymous: false,
  //       inputs: [
  //         {
  //           indexed: true,
  //           internalType: "bytes32",
  //           name: "role",
  //           type: "bytes32",
  //         },
  //         {
  //           indexed: true,
  //           internalType: "address",
  //           name: "account",
  //           type: "address",
  //         },
  //         {
  //           indexed: true,
  //           internalType: "address",
  //           name: "sender",
  //           type: "address",
  //         },
  //       ],
  //       name: "RoleGranted",
  //       type: "event",
  //     },
  //     {
  //       anonymous: false,
  //       inputs: [
  //         {
  //           indexed: true,
  //           internalType: "bytes32",
  //           name: "role",
  //           type: "bytes32",
  //         },
  //         {
  //           indexed: true,
  //           internalType: "address",
  //           name: "account",
  //           type: "address",
  //         },
  //         {
  //           indexed: true,
  //           internalType: "address",
  //           name: "sender",
  //           type: "address",
  //         },
  //       ],
  //       name: "RoleRevoked",
  //       type: "event",
  //     },
  //     {
  //       inputs: [],
  //       name: "DEFAULT_ADMIN_ROLE",
  //       outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
  //       stateMutability: "view",
  //       type: "function",
  //     },
  //     {
  //       inputs: [],
  //       name: "FORTUNNA_TOKEN_PROTO_INDEX",
  //       outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
  //       stateMutability: "view",
  //       type: "function",
  //     },
  //     {
  //       inputs: [
  //         { internalType: "address", name: "prototype", type: "address" },
  //       ],
  //       name: "addPrototype",
  //       outputs: [],
  //       stateMutability: "nonpayable",
  //       type: "function",
  //     },
  //     {
  //       inputs: [
  //         {
  //           components: [
  //             {
  //               internalType: "uint256",
  //               name: "protoPoolIdx",
  //               type: "uint256",
  //             },
  //             {
  //               internalType: "uint256",
  //               name: "startTimestamp",
  //               type: "uint256",
  //             },
  //             {
  //               internalType: "uint256",
  //               name: "endTimestamp",
  //               type: "uint256",
  //             },
  //             {
  //               internalType: "uint256",
  //               name: "minStakeAmount",
  //               type: "uint256",
  //             },
  //             {
  //               internalType: "uint256",
  //               name: "maxStakeAmount",
  //               type: "uint256",
  //             },
  //             {
  //               internalType: "uint256",
  //               name: "minLockUpRewardsPeriod",
  //               type: "uint256",
  //             },
  //             {
  //               internalType: "uint256",
  //               name: "earlyWithdrawalFeeBasePoints",
  //               type: "uint256",
  //             },
  //             {
  //               internalType: "uint256",
  //               name: "depositWithdrawFeeBasePoints",
  //               type: "uint256",
  //             },
  //             {
  //               internalType: "uint256",
  //               name: "totalRewardBasePointsPerDistribution",
  //               type: "uint256",
  //             },
  //             {
  //               internalType: "bytes32",
  //               name: "stakingTokensMask",
  //               type: "bytes32",
  //             },
  //             {
  //               internalType: "bytes32",
  //               name: "rewardTokensMask",
  //               type: "bytes32",
  //             },
  //             {
  //               components: [
  //                 {
  //                   internalType: "address",
  //                   name: "nonfungiblePositionManager",
  //                   type: "address",
  //                 },
  //               ],
  //               internalType: "struct FortunnaLib.CustomPoolParameters",
  //               name: "custom",
  //               type: "tuple",
  //             },
  //           ],
  //           internalType: "struct FortunnaLib.PoolParameters",
  //           name: "poolParameters",
  //           type: "tuple",
  //         },
  //         {
  //           components: [
  //             {
  //               internalType: "address[]",
  //               name: "utilizingTokens",
  //               type: "address[]",
  //             },
  //             {
  //               internalType: "uint256[2][]",
  //               name: "initialRewardAmounts",
  //               type: "uint256[2][]",
  //             },
  //             {
  //               internalType: "uint256[2][]",
  //               name: "initialDepositAmounts",
  //               type: "uint256[2][]",
  //             },
  //           ],
  //           internalType: "struct FortunnaLib.PoolParametersArrays",
  //           name: "poolParametersArrays",
  //           type: "tuple",
  //         },
  //       ],
  //       name: "createPool",
  //       outputs: [{ internalType: "address", name: "pool", type: "address" }],
  //       stateMutability: "payable",
  //       type: "function",
  //     },
  //     {
  //       inputs: [{ internalType: "bool[]", name: "flags", type: "bool[]" }],
  //       name: "generateMask",
  //       outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
  //       stateMutability: "pure",
  //       type: "function",
  //     },
  //     {
  //       inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
  //       name: "getPoolAt",
  //       outputs: [{ internalType: "address", name: "", type: "address" }],
  //       stateMutability: "view",
  //       type: "function",
  //     },
  //     {
  //       inputs: [],
  //       name: "getPoolsLength",
  //       outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
  //       stateMutability: "view",
  //       type: "function",
  //     },
  //     {
  //       inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
  //       name: "getPrototypeAt",
  //       outputs: [{ internalType: "address", name: "result", type: "address" }],
  //       stateMutability: "view",
  //       type: "function",
  //     },
  //     {
  //       inputs: [],
  //       name: "getPrototypesLength",
  //       outputs: [{ internalType: "uint256", name: "result", type: "uint256" }],
  //       stateMutability: "view",
  //       type: "function",
  //     },
  //     {
  //       inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
  //       name: "getRoleAdmin",
  //       outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
  //       stateMutability: "view",
  //       type: "function",
  //     },
  //     {
  //       inputs: [
  //         { internalType: "bytes32", name: "role", type: "bytes32" },
  //         { internalType: "address", name: "account", type: "address" },
  //       ],
  //       name: "grantRole",
  //       outputs: [],
  //       stateMutability: "nonpayable",
  //       type: "function",
  //     },
  //     {
  //       inputs: [
  //         { internalType: "bytes32", name: "role", type: "bytes32" },
  //         { internalType: "address", name: "account", type: "address" },
  //       ],
  //       name: "hasRole",
  //       outputs: [{ internalType: "bool", name: "", type: "bool" }],
  //       stateMutability: "view",
  //       type: "function",
  //     },
  //     {
  //       inputs: [],
  //       name: "paymentInfo",
  //       outputs: [
  //         { internalType: "address", name: "paymentToken", type: "address" },
  //         { internalType: "uint256", name: "cost", type: "uint256" },
  //       ],
  //       stateMutability: "view",
  //       type: "function",
  //     },
  //     {
  //       inputs: [
  //         { internalType: "uint256", name: "poolProtoIdx", type: "uint256" },
  //         { internalType: "uint256", name: "poolIdx", type: "uint256" },
  //         { internalType: "bool", name: "isStakingOrReward", type: "bool" },
  //       ],
  //       name: "predictFortunnaTokenAddress",
  //       outputs: [
  //         { internalType: "address", name: "result", type: "address" },
  //         { internalType: "bytes32", name: "salt", type: "bytes32" },
  //       ],
  //       stateMutability: "view",
  //       type: "function",
  //     },
  //     {
  //       inputs: [
  //         { internalType: "uint256", name: "poolProtoIdx", type: "uint256" },
  //       ],
  //       name: "predictPoolAddress",
  //       outputs: [
  //         { internalType: "address", name: "result", type: "address" },
  //         { internalType: "bytes32", name: "salt", type: "bytes32" },
  //       ],
  //       stateMutability: "view",
  //       type: "function",
  //     },
  //     {
  //       inputs: [
  //         { internalType: "bytes32", name: "role", type: "bytes32" },
  //         { internalType: "address", name: "account", type: "address" },
  //       ],
  //       name: "renounceRole",
  //       outputs: [],
  //       stateMutability: "nonpayable",
  //       type: "function",
  //     },
  //     {
  //       inputs: [
  //         { internalType: "bytes32", name: "role", type: "bytes32" },
  //         { internalType: "address", name: "account", type: "address" },
  //       ],
  //       name: "revokeRole",
  //       outputs: [],
  //       stateMutability: "nonpayable",
  //       type: "function",
  //     },
  //     {
  //       inputs: [
  //         { internalType: "address", name: "token", type: "address" },
  //         { internalType: "address payable", name: "who", type: "address" },
  //         { internalType: "uint256", name: "amount", type: "uint256" },
  //       ],
  //       name: "sendCollectedTokens",
  //       outputs: [],
  //       stateMutability: "nonpayable",
  //       type: "function",
  //     },
  //     {
  //       inputs: [
  //         {
  //           components: [
  //             {
  //               internalType: "address",
  //               name: "paymentToken",
  //               type: "address",
  //             },
  //             { internalType: "uint256", name: "cost", type: "uint256" },
  //           ],
  //           internalType: "struct FortunnaLib.PaymentInfo",
  //           name: "_paymentInfo",
  //           type: "tuple",
  //         },
  //       ],
  //       name: "setPaymentInfo",
  //       outputs: [],
  //       stateMutability: "nonpayable",
  //       type: "function",
  //     },
  //     {
  //       inputs: [
  //         { internalType: "bytes4", name: "interfaceId", type: "bytes4" },
  //       ],
  //       name: "supportsInterface",
  //       outputs: [{ internalType: "bool", name: "", type: "bool" }],
  //       stateMutability: "view",
  //       type: "function",
  //     },
  //     { stateMutability: "payable", type: "receive" },
  //   ],
  //   functionName: "createPool",
  // });

  // console.log("is loading", JSON.stringify(isLoading));
  // console.log("is error is", isError);
  // console.log("is data is", data);

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
                  setActiveSteeper(steeperHeader[1].key);
                }}
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
                  setActiveSteeper(steeperHeader[1].key);
                }}
              />
              <CreateFarmReview
                onSubmit={() => {
                  // write?.();
                  // connect?.();
                }}
                data={[
                  {
                    name: "Pool Name",
                    value: "Fortuna Pool",
                  },
                  {
                    name: "Pool Image URL",
                    value: "https://upload.fortuna.io",
                  },

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
                  {
                    name: "Early withdrawal fee (Optional)",
                    value: "Yes",
                  },
                  {
                    name: "% Loss",
                    value: "10",
                  },
                  {
                    name: "% From Deposit/Profit",
                    value: "Deposit",
                  },
                  {
                    name: "Minimum Lock-up Period",
                    value: new Date(minLockUpRewardsPeriod).toISOString(),
                  },
                  ,
                  {
                    name: "Taken in",
                    value: "Token A",
                  },
                  {
                    name: "Reward Token A",
                    value: null,
                    sub: [
                      {
                        name: "Reward Quantity",
                        value: "0.1",
                      },
                      {
                        name: "Reward Distribution",
                        value: "Linear",
                      },
                      {
                        name: "Compounding",
                        value: "Yes",
                      },
                      {
                        name: "Reward Distribution Duration",
                        value: "Weekly - 7 days",
                      },
                      {
                        name: "Initial Deposit Amount",
                        value: "0.01123",
                      },
                    ],
                  },
                  {
                    name: "Reward Token B",
                    value: null,
                    sub: [
                      {
                        name: "Reward Quantity",
                        value: "0.002345",
                      },
                      {
                        name: "Reward Distribution",
                        value: "Custom",
                      },
                      {
                        name: "Compounding",
                        value: "Yes",
                      },
                      {
                        name: "Reward Distribution Duration",
                        value: "Monthly - 30 days",
                      },
                      {
                        name: "Initial Deposit Amount",
                        value: "0.21123",
                      },
                    ],
                  },
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
