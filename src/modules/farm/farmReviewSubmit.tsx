import Button from "@/components/button";
import Card from "@/components/card";
import FormGroup from "@/components/form/form-group";
import Radio from "@/components/radio";
import Typography from "@/components/typography";
import classNames from "classnames";
import React, { MouseEventHandler } from "react";
import { useFarm } from "@/hooks/useFarm";
import { convertTimeStamptoDate, makeCostUnit } from "@/utils";
import { useNetwork, useWalletClient, Address, useBalance } from "wagmi";
import { ethers, parseEther } from "ethers";
import FortunnaFactoryABI from "@/assets/FortunnaFactory.json";
import { FACTORY_ADDRESS, SupportedChains, TOAST_MESSAGE } from "@/constants";
import { toast } from "react-toastify";

type componentProps = {
  // onNext: MouseEventHandler<HTMLButtonElement>;
  onPrevious: MouseEventHandler<HTMLButtonElement>;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
  data: any;
};

export default function CreateFarmReview({
  // onNext,
  onPrevious
}: componentProps) {

  const {chain} = useNetwork();
  const {data:walletClient} = useWalletClient();
  const { data:balance, isError, isLoading } = useBalance({
    address:walletClient?.account.address
  });
  
  const {
    poolName,
    poolImage,
    tokenAAddress, 
    tokenASymbol,
    tokenADecimal,
    tokenALogo,
    tokenBAddress,
    tokenBSymbol,
    tokenBDecimal,
    tokenBLogo,
    startTime,
    endTime,
    minimumStakeAmount,
    maximumStakeAmount,
    withdrawFee,
    lossPercentage,
    depositProfit,
    lockupPeriod,
    rewardToken,
    tokenARewardQt,
    tokenARewardDis,
    tokenARewardCom,
    tokenARewardDur,
    tokenARewardInit,
    tokenBRewardQt,
    tokenBRewardDis,
    tokenBRewardCom,
    tokenBRewardDur,
    tokenBRewardInit,
    costFarm
  } = useFarm();

  const data = [
    {
      name: "Pool Name",
      value: poolName,
    },
    {
      name: "Pool Image URL",
      value: poolImage,
    },
    {
      name: "Token A",
      value: null,
      sub: [
        {
          name: "Contract Address",
          value: tokenAAddress,
        },
        {
          name: "Token Symbol",
          value: tokenASymbol,
        },
        {
          name: "Token Decimals",
          value: tokenADecimal.toString(),
        },
        {
          name: "Token Logo URL (Optional)",
          value: tokenALogo,
        },
        {
          name: "Token Network",
          value: "ETH",
        },
      ],
    },
    {
      name: "Token B",
      value: null,
      sub: [
        {
          name: "Contract Address",
          value: tokenBAddress,
        },
        {
          name: "Token Symbol",
          value: tokenBSymbol,
        },
        {
          name: "Token Decimals",
          value: tokenBDecimal.toString(),
        },
        {
          name: "Token Logo URL (Optional)",
          value: tokenBLogo,
        },
        {
          name: "Token Network",
          value: "ETH",
        },
      ],
    },
    {
      name: "Start time",
      value: startTime,
    },
    {
      name: "End time",
      value: endTime,
    },
    {
      name: "Minimum stake amount",
      value: minimumStakeAmount.toString(),
    },
    {
      name: "Maximum stake amount",
      value: maximumStakeAmount.toString(),
    },
    {
      name: "Early withdrawal fee (Optional)",
      value: withdrawFee ? "Yes" : "No",
    },
    {
      name: "% Loss",
      value: lossPercentage,
    },
    {
      name: "% From Deposit/Profit",
      value: depositProfit,
    },
    {
      name: "Minimum Lock-up Period",
      value: `${lockupPeriod} day(s)`,
    },
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
          value: tokenARewardQt.toString(),
        },
        {
          name: "Reward Distribution",
          value: tokenARewardDis.toString(),
        },
        {
          name: "Compounding",
          value: tokenARewardCom ? "Yes" : "No",
        },
        {
          name: "Reward Distribution Duration",
          value: `${tokenARewardDur} day(s)`,
        },
        {
          name: "Initial Deposit Amount",
          value: tokenARewardInit.toString(),
        },
      ],
    },
    {
      name: "Reward Token B",
      value: null,
      sub: [
        {
          name: "Reward Quantity",
          value: tokenBRewardQt.toString(),
        },
        {
          name: "Reward Distribution",
          value: tokenBRewardDis.toString(),
        },
        {
          name: "Compounding",
          value: tokenBRewardCom ? "Yes" : "No",
        },
        {
          name: "Reward Distribution Duration",
          value: `${tokenBRewardDur} day(s)`,
        },
        {
          name: "Initial Deposit Amount",
          value: tokenBRewardInit.toString(),
        },
      ],
    },
    ,
    {
      name: "Currency",
      value: "ETH",
    },
  ];

  const onSubmit = async () => {

    if (!walletClient || !chain || !balance) {
      toast.error(TOAST_MESSAGE.CONNECT_WALLET, {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }
        
    try {
      ///////////////////////Approve/////////////////////
      // const tokenA_Amount = await tokenAContract.read.allowance([
      //   walletClient?.account.address,
      //   PLATFORM.ETH.FACTORY
      // ]);

      // const tokenB_Amount = await tokenBContract.read.allowance([
      //   walletClient?.account.address,
      //   PLATFORM.ETH.FACTORY
      // ]);

      // if (parseFloat(ethers.formatUnits(tokenA_Amount, parseInt(tokenADecimal))) < maximumStakeAmount) {
      //   await tokenAContract.write.approve([
      //     PLATFORM.ETH.FACTORY,
      //     ethers.MaxInt256
      //   ]);
      // }

      // if (parseFloat(ethers.formatUnits(tokenB_Amount, parseInt(tokenBDecimal))) < maximumStakeAmount) {
      //   await tokenBContract.write.approve([
      //     PLATFORM.ETH.FACTORY,
      //     ethers.MaxInt256
      //   ]);
      // }

      if (parseFloat(balance.formatted) < parseFloat(costFarm)) {
        toast.error(`Not enough ${chain.nativeCurrency.symbol} balance!`, {
          position: toast.POSITION.TOP_CENTER
        });
        return;
      }

      const tx = await walletClient?.writeContract({
        address: FACTORY_ADDRESS[chain.id as SupportedChains] as Address,
        abi: FortunnaFactoryABI,
        functionName: "createPool",
        args:[
          [
            1,
            new Date(startTime).getTime(),
            new Date(endTime).getTime(),
            ethers.parseUnits(minimumStakeAmount.toString(), tokenADecimal),
            ethers.parseUnits(maximumStakeAmount.toString(), tokenADecimal),
            withdrawFee ? parseInt(lockupPeriod) * 24 * 60 * 60 : 0,
            withdrawFee ? parseInt(lossPercentage) * 100 : 0,
            0,
            rewardToken === 1 ? tokenARewardDis * 100 : tokenBRewardDis * 100,
            "0x0000000000000000000000000000000000000000000000000000000000000003",
            rewardToken === 1 ? "0x0000000000000000000000000000000000000000000000000000000000000001" :
            rewardToken === 2 ? "0x0000000000000000000000000000000000000000000000000000000000000002" :
                               "0x0000000000000000000000000000000000000000000000000000000000000003",
            ["0xC36442b4a4522E871399CD717aBDD847Ab11FE88"]
          ],
          [
            [tokenAAddress, tokenBAddress],
            [
              [0,ethers.parseUnits(tokenARewardQt.toString(), tokenADecimal)],
              [1,ethers.parseUnits(tokenBRewardQt.toString(), tokenBDecimal)]
            ],
            [
              [0,ethers.parseUnits(tokenARewardInit.toString(), tokenADecimal)],
              [1,ethers.parseUnits(tokenARewardInit.toString(), tokenBDecimal)]
            ]
          ]],
          account: walletClient.account.address,
          value: parseEther(costFarm)
      });
      
      toast.success(TOAST_MESSAGE.TRANSACTION_SUBMITTED, {
        position: toast.POSITION.TOP_CENTER
      });

    } catch (error) {
      console.log(error);
    }
  }

  const DetailsPreview = ({
    name,
    value,
    sub = false,
  }: {
    name: string;
    sub?: boolean;
    value: null | string;
  }) => {
    const positionStyles = classNames({
      "lg:ps-[50px] md:ps-[35px] ps-[20px]": sub,
    });
    return (
      <>
        <div
          className={`flex flex-wrap py-[15px] justify-between ${positionStyles}`}
        >
          <Typography
            className="!font-aeonik-pro !text-light-white"
            variant="body2"
            label={name}
          />
          {value ? (
            <Typography
              variant="body2"
              className="!font-aeonik-pro-bold !text-light-4"
              label={value}
            />
          ) : null}
        </div>
        <div className={positionStyles}>
          <Line />
        </div>
      </>
    );
  };
  const Line = () => {
    return <div className="h-[1px] bg-harsh"></div>;
  };
  return (
    <div>
      <Card>
        <>
          {data.map((_data: any, index: any) => {
            return (
              <div className="" key={index}>
                <DetailsPreview
                  value={_data?.value || ""}
                  name={_data?.name || ""}
                />
                {_data?.sub?.map((_sub: any, index: any) => {
                  return (
                    <div key={index}>
                      <DetailsPreview
                        sub={true}
                        value={_sub?.value || ""}
                        name={_sub?.name || ""}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
          <div className="text-center mt-[48px] ">
            <div>
              <Typography
                variant="body3"
                className="!text-secondary !font-aeonik-pro-bold mb-3"
                label={"Need equivalent of " + makeCostUnit(costFarm, chain?.nativeCurrency.symbol) + " to create pool"}
              />
            </div>
            <div className="flex justify-center">
              <Button
                onClick={onPrevious}
                theme="dark"
                className="!px-12"
                size="big"
                label="Back"
              />
              <div className="mx-4"></div>
              <Button
                theme="secondary"
                className="!px-12"
                onClick={onSubmit}
                size="big"
                label="Submit"
              />
            </div>
          </div>
        </>
      </Card>
    </div>
  );
}
