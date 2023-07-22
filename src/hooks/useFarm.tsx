import React, { useContext, useState } from "react";

export interface Farm {
    poolName: string;   //pool name
    setPoolName: (name:string) => void;
    poolImage: string;  //pool image
    setPoolImage: (image:string) => void;
    tokenAAddress: string;  //pool token A address
    setTokenAAddress: (address:string) => void;
    tokenASymbol: string;   //pool token A symbol
    setTokenASymbol: (symbol:string) => void;
    tokenADecimal: number;  //pool token A decimal
    setTokenADecimal: (decimal:number) => void;
    tokenALogo: string;     //pool token A logo
    setTokenALogo: (logo:string) => void;
    tokenBAddress: string;  //pool token B address
    setTokenBAddress: (address:string) => void;
    tokenBSymbol: string;   //pool token B symbol
    setTokenBSymbol: (symbol:string) => void;
    tokenBDecimal: number;  //pool token B decimal
    setTokenBDecimal: (decimal:number) => void;
    tokenBLogo: string;     //pool token B logo
    setTokenBLogo: (logo:string) => void;
    startTime: string;  //pool start timestmp
    setStartTime: (time: string) => void;
    endTime: string;    //pool end timestamp
    setEndTime: (time: string) => void;
    minimumStakeAmount: number;     //pool minimum stake amount
    setMinimumStakeAmount:(amount: number) => void;
    maximumStakeAmount: number;     //pool maximum stake amount
    setMaximumStakeAmount: (amount: number) => void;
    withdrawFee: boolean;   // withdraw fee optoin default("no")
    setWithdrawFee: (fee: boolean) => void;
    lossPercentage: string; //loss percentage
    setLossPercentage: (percent: string) => void;
    depositProfit: string;  //deposit percentage
    setDepositProfit: (profit :string) => void;
    takeInOption: boolean;  //take in option
    setTakeInOption: (takeIn: boolean) => void;
    lockupPeriod: string;   //lock up period seconds
    setLockupPeriod: (lockup: string) => void;
    rewardToken: number; //1: tokenA, 2: tokenB, 3: both
    setRewardToken: (reward: number) => void;
    tokenARewardQt: number; //token A reward quantity
    setTokenARewardQt: (rewardQt: number) => void;
    tokenARewardDis: number;    //token A reward distribution
    setTokenARewardDis: (rewardDis: number) => void;
    tokenARewardCom: boolean;   //token A compound default (No)
    setTokenARewardCom: (rewardCom: boolean) => void;
    tokenARewardDur: number; //token A reward distribution duration
    setTokenARewardDur: (rewardDur: number) => void;
    tokenARewardInit: number;   //token A reward init deposit amount
    setTokenARewardInit: (rewardInit: number) => void;
    tokenBRewardQt: number; //token B reward quantity
    setTokenBRewardQt: (rewardQt: number) => void;
    tokenBRewardDis: number;    //token B reward distrubtion 
    setTokenBRewardDis: (rewardDis: number) => void;
    tokenBRewardCom: boolean;   //token B reward compound default (No)
    setTokenBRewardCom: (rewardCom: boolean) => void;
    tokenBRewardDur: number; //token B reward ditribution duration
    setTokenBRewardDur: (rewardDur: number) => void;
    tokenBRewardInit: number;   //token B reward init deposit amount
    setTokenBRewardInit: (rewardInit: number) => void;
    costFarm: string;   //cost fee for creating pool
    setCostFarm: (cost: string) => void;
}

const FarmContext: React.Context<null | Farm> = 
    React.createContext<null | Farm>(null);

export function FarmProvider({children}:any) {
    
    const [pool_Name, setPool_Name] = useState<string>("");
    const [pool_Image, setPool_Image] = useState<string>("");
    const [tokenA_Address, setTokenA_Address] = useState<string>("");
    const [tokenA_Symbol, setTokenA_Symbol] = useState<string>("");
    const [tokenA_Decimal, setTokenA_Decimal] = useState<number>(0);
    const [tokenA_Logo, setTokenA_Logo] = useState<string>("");
    const [tokenB_Address, setTokenB_Address] = useState<string>("");
    const [tokenB_Symbol, setTokenB_Symbol] = useState<string>("");
    const [tokenB_Decimal, setTokenB_Decimal] = useState<number>(0);
    const [tokenB_Logo, setTokenB_Logo] = useState<string>("");
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [minimum_StakeAmount, setMinimum_StakeAmount] = useState<number>(0);
    const [maximum_StakeAmount, setMaximum_StakeAmount] = useState<number>(0);
    const [withdraw_Fee, setWithdraw_Fee] = useState<boolean>(false);
    const [loss_Percentage, setLoss_Percentage] = useState<string>("10");
    const [deposit_Profit, setDeposit_Profit] = useState<string>("");
    const [takeIn_Option, setTakeIn_Option] = useState<boolean>(false);
    const [lockup_Period, setLockup_Period] = useState<string>("30");
    const [reward_token, setReward_Token] = useState<number>(0);
    const [tokenA_RewardQt, setTokenA_RewardQt] = useState<number>(0);
    const [tokenA_RewardDis, setTokenA_RewardDis] = useState<number>(0);
    const [tokenA_RewardCom, setTokenA_RewardCom] = useState<boolean>(false);
    const [tokenA_RewardDur, setTokenA_RewardDur] = useState<number>(1);
    const [tokenA_RewardInit, setTokenA_RewardInit] = useState<number>(0);
    const [tokenB_RewardQt, setTokenB_RewardQt] = useState<number>(0);
    const [tokenB_RewardDis, setTokenB_RewardDis] = useState<number>(0);
    const [tokenB_RewardCom, setTokenB_RewardCom] = useState<boolean>(false);
    const [tokenB_RewardDur, setTokenB_RewardDur] = useState<number>(1);
    const [tokenB_RewardInit, setTokenB_RewardInit] = useState<number>(0);
    const [cost_Farm, setCost_Farm] = useState<string>("0.0");

    return (
        <FarmContext.Provider
            value = {{
                poolName: pool_Name,
                setPoolName: setPool_Name,
                poolImage: pool_Image,
                setPoolImage: setPool_Image,
                tokenAAddress: tokenA_Address,
                setTokenAAddress: setTokenA_Address,
                tokenASymbol: tokenA_Symbol,
                setTokenASymbol: setTokenA_Symbol,
                tokenADecimal: tokenA_Decimal,
                setTokenADecimal: setTokenA_Decimal,
                tokenALogo: tokenA_Logo,
                setTokenALogo: setTokenA_Logo,
                tokenBAddress: tokenB_Address,
                setTokenBAddress: setTokenB_Address,
                tokenBSymbol: tokenB_Symbol,
                setTokenBSymbol: setTokenB_Symbol, 
                tokenBDecimal: tokenB_Decimal,
                setTokenBDecimal: setTokenB_Decimal,
                tokenBLogo: tokenB_Logo,
                setTokenBLogo: setTokenB_Logo,
                startTime: startTime,
                setStartTime: setStartTime,
                endTime: endTime,
                setEndTime: setEndTime,
                minimumStakeAmount: minimum_StakeAmount,
                setMinimumStakeAmount: setMinimum_StakeAmount,
                maximumStakeAmount: maximum_StakeAmount,
                setMaximumStakeAmount: setMaximum_StakeAmount,
                withdrawFee: withdraw_Fee,
                setWithdrawFee: setWithdraw_Fee,
                lossPercentage: loss_Percentage,
                setLossPercentage: setLoss_Percentage,
                depositProfit: deposit_Profit,
                setDepositProfit: setDeposit_Profit,
                takeInOption:takeIn_Option,
                setTakeInOption: setTakeIn_Option,
                lockupPeriod: lockup_Period,
                setLockupPeriod: setLockup_Period,
                rewardToken: reward_token,
                setRewardToken: setReward_Token,
                tokenARewardQt: tokenA_RewardQt,
                setTokenARewardQt: setTokenA_RewardQt,
                tokenARewardDis: tokenA_RewardDis, 
                setTokenARewardDis: setTokenA_RewardDis,
                tokenARewardCom: tokenA_RewardCom,
                setTokenARewardCom: setTokenA_RewardCom,
                tokenARewardDur: tokenA_RewardDur,
                setTokenARewardDur: setTokenA_RewardDur,
                tokenARewardInit: tokenA_RewardInit,
                setTokenARewardInit: setTokenA_RewardInit,
                tokenBRewardQt: tokenB_RewardQt,
                setTokenBRewardQt: setTokenB_RewardQt,
                tokenBRewardDis: tokenB_RewardDis,
                setTokenBRewardDis: setTokenB_RewardDis,
                tokenBRewardCom: tokenB_RewardCom,
                setTokenBRewardCom: setTokenB_RewardCom,
                tokenBRewardDur: tokenB_RewardDur,
                setTokenBRewardDur: setTokenB_RewardDur,
                tokenBRewardInit: tokenB_RewardInit,
                setTokenBRewardInit: setTokenB_RewardInit,
                costFarm: cost_Farm,
                setCostFarm: setCost_Farm
            }}
        >
            {children}
        </FarmContext.Provider>
    );

}

export function useFarm() {
    const context = useContext(FarmContext);
    if (!context) {
        throw new Error("Missing Farm context");
    }

    return context;
}