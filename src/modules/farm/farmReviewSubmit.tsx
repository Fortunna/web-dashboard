import Button from "@/components/button";
import Card from "@/components/card";
import Typography from "@/components/typography";
import classNames from "classnames";
import React, { MouseEventHandler, useState } from "react";
import { useFarm } from "@/hooks/useFarm";
import { makeCostUnit, removeForwardZero } from "@/utils";
import ERC20TokenABI from "@/assets/ERC20ABI.json";
import { useNetwork, useWalletClient, Address, useBalance, usePublicClient } from "wagmi";
import { ethers, parseEther } from "ethers";
import FortunnaFactoryABI from "@/assets/FortunnaFactory.json";
import { FACTORY_ADDRESS, FIREBASE_DATABASE_NAME, PoolMode, SupportedChains, TOAST_MESSAGE } from "@/constants";
import { toast } from "react-toastify";
import { database } from "@/utils/firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

type componentProps = {
  // onNext: MouseEventHandler<HTMLButtonElement>;
  onPrevious: MouseEventHandler<HTMLButtonElement>;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
  mode: any;
};

const dbInstance = collection(database, FIREBASE_DATABASE_NAME);

export default function CreateFarmReview({
  // onNext,
  onPrevious,
  mode
}: componentProps) {

  const {chain} = useNetwork();
  const {data:walletClient} = useWalletClient();
  const publicClient = usePublicClient();
  const { data:balance, isError, isLoading } = useBalance({
    address:walletClient?.account.address,
    watch:true
  });
  const [txStatus, setTxStatus] = useState<boolean>(false);
  
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

  const savePool = (poolAddress: string) => {
    const currentDT = new Date().getTime();
    
    setDoc(doc(dbInstance, poolName.replace("/", "-")), {
      id: 0,
      name: poolName,
      address: poolAddress,
      type: mode[0],
      poolLogo: poolImage,
      tokenALogo: tokenALogo,
      tokenBLogo: tokenBLogo,
      createdAt: currentDT,
      visible: false,
      tokenCount: tokenAAddress && tokenBAddress ? 2 : 1
    })
    .then(() => {
    })

    // addDoc(dbInstance, {
    //     id: 0,
    //     name: poolName,
    //     address: poolAddress,
    //     type: mode[0],
    //     poolLogo: poolImage,
    //     tokenALogo: tokenALogo,
    //     tokenBLogo: tokenBLogo,
    //     createdAt: currentDT,
    //     visible: false
    // })
    //     .then(() => {
    //     })

  }
  const onApproveToken = async (
    tokenAddress: string, 
    stakingAddress: string, 
    rewardingAddress: string
  ) => {

    const txApproveStaking:any = await walletClient!.writeContract({
      address: tokenAddress as Address,
      abi: ERC20TokenABI,
      functionName: "approve",
      args:[
        stakingAddress,
        ethers.MaxUint256
      ]
    });

    const txApproveRewarding = await walletClient!.writeContract({
      address: tokenAddress as Address,
      abi: ERC20TokenABI,
      functionName: "approve",
      args:[
        rewardingAddress,
        ethers.MaxUint256
      ]
    });

    return [txApproveStaking, txApproveRewarding];
  }

  const onCheckBalanceForPool = () => {

    if (parseFloat(balance!.formatted) < parseFloat(costFarm)) {
      toast.error(`Not enough ${chain!.nativeCurrency.symbol} balance for creating Pool!`, {
        position: toast.POSITION.TOP_CENTER
      });
      return false;
    }

    if (parseFloat(tokenABalance!.formatted) < tokenARewardInit ||
        parseFloat(tokenABalance!.formatted) < tokenARewardQt) {
      toast.error(`Not enough ${tokenASymbol} balance for deposit or reward!`, {
        position: toast.POSITION.TOP_CENTER
      });
      return false;
    }

    if (!tokenBAddress)
      return true;

    if (parseFloat(tokenBBalance!.formatted) < tokenBRewardInit ||
        parseFloat(tokenBBalance!.formatted) < tokenBRewardQt) {
      toast.error(`Not enough ${tokenBSymbol} balance for deposit or reward!`, {
        position: toast.POSITION.TOP_CENTER
      });
      return false;
    }

    return true;
  }
  const onWaitTransactionReceipt = async (txHash: any, waitPoolAddress = false) => {

    console.log('txHash', txHash);
    let index;
    try{    
      for(index = 0; index < txHash.length; index ++) {   
        const confirmation = await publicClient.waitForTransactionReceipt({
          hash:txHash[index],
          timeout: 100000
        });
        if (waitPoolAddress) {
          return confirmation.logs[confirmation.logs.length - 1].topics[1];
        }
      }
    } catch (ex) {

    } 

    return "";
  }

  const onSubmit = async () => {

    if (!walletClient || !chain || !balance) {
      toast.error(TOAST_MESSAGE.CONNECT_WALLET, {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }
        
    if (!onCheckBalanceForPool()) {
      return; 
    }

    setTxStatus(true);

    try {

      const poolLength = await publicClient.readContract({
        address: FACTORY_ADDRESS[chain.id as SupportedChains] as Address,
        abi: FortunnaFactoryABI,
        functionName: "getPoolsLength"
      });

      const stakingToken:any = await publicClient.readContract({
        address: FACTORY_ADDRESS[chain.id as SupportedChains] as Address,
        abi: FortunnaFactoryABI,
        functionName: "predictFortunnaTokenAddress",
        args:[
          0,
          poolLength,
          true
        ]
      });

      const rewardingToken:any = await publicClient.readContract({
        address: FACTORY_ADDRESS[chain.id as SupportedChains] as Address,
        abi: FortunnaFactoryABI,
        functionName: "predictFortunnaTokenAddress",
        args:[
          0,
          poolLength,
          false
        ]
      });

      if (!stakingToken || !rewardingToken) {
        toast.error(TOAST_MESSAGE.UNEXPECTED_ERROR, {
          position: toast.POSITION.TOP_CENTER
        });
        return;
      }
      // ///////////////////////Approve/////////////////////

      if (mode[0] == PoolMode.CLASSIC_FARM) {

        let txArray = [];
        const [txApprove1, txApprove2] = await onApproveToken(tokenAAddress, stakingToken[0], rewardingToken[0]);
        txArray.push(txApprove1);
        txArray.push(txApprove2);

        if (tokenBAddress) {
          const [txApprove3, txApprove4] = await onApproveToken(tokenBAddress, stakingToken[0], rewardingToken[0]);
          txArray.push(txApprove3);
          txArray.push(txApprove4);
        }
        toast.success(TOAST_MESSAGE.WAITING_APPROVE_TRANSACTION, {
          position: toast.POSITION.TOP_CENTER
        });

        await onWaitTransactionReceipt(txArray);            
      }

      let tx;
      let tokenArray = [];
      let tokenRewardQtArray = [];
      let tokenRewardInitArray = [];
      if (tokenAAddress) {
        tokenArray.push(tokenAAddress);
        tokenRewardQtArray.push([0,ethers.parseUnits(tokenARewardQt.toString(), tokenADecimal)]);
        tokenRewardInitArray.push([0,ethers.parseUnits(tokenARewardInit.toString(), tokenADecimal)]);
      }
      if (tokenBAddress) {
        tokenArray.push(tokenBAddress);
        tokenRewardQtArray.push([0,ethers.parseUnits(tokenBRewardQt.toString(), tokenBDecimal)]);
        tokenRewardInitArray.push([0,ethers.parseUnits(tokenBRewardInit.toString(), tokenBDecimal)]);
      }
      await walletClient?.writeContract({
        address: FACTORY_ADDRESS[chain.id as SupportedChains] as Address,
        abi: FortunnaFactoryABI,
        functionName: "createPool",
        args:[
          [
            mode[0],
            new Date(startTime).getTime(),
            new Date(endTime).getTime(),
            ethers.parseUnits(minimumStakeAmount.toString(), tokenADecimal),
            ethers.parseUnits(maximumStakeAmount.toString(), tokenADecimal),
            parseInt(lockupPeriod) * 24 * 60 * 60,
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
            tokenArray,
            tokenRewardQtArray,
            tokenRewardInitArray
          ]],
          account: walletClient.account.address,
          value: parseEther(costFarm)
      }).then(arg => {
        console.log('finished transaction', arg);
        tx = arg;
      });

      const address_res = await onWaitTransactionReceipt([tx], true);
      console.log('address_res', address_res);

      if (address_res) {
        const address = removeForwardZero(address_res);
        console.log('address', address);
        savePool(address);
      }

      toast.success(TOAST_MESSAGE.POOL_CREATED_SUCCESSFULLY, {
        position: toast.POSITION.TOP_CENTER
      });

    } catch (error) {
      console.log(error);
      toast.warning(TOAST_MESSAGE.USER_REJECTED, {
        position: toast.POSITION.TOP_CENTER
      });
    }
    setTxStatus(false);
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
                disabled = {txStatus}
              />
              <div className="mx-4"></div>
              <Button
                theme="secondary"
                className="!px-12"
                onClick={onSubmit}
                size="big"
                label={!txStatus ? "Submit" : "Progress..."}
                disabled = {txStatus}
                />
                </div>
            </div>

        </>
      </Card>
    </div>
  );
}