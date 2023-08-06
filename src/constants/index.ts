export enum SupportedChains {
    ETH_MAINNET = 1,
    GOERLI = 5,
    BSC_MAINNET = 56,
    BSC_TESTNET = 97
}

export enum PoolMode {
    CLASSIC_FARM = 0,
    UNISWAP_POOL = 1
}

export enum BalanceShowDecimals {
    WALLET_BALANCE = 3,
    FARM_SHOW_BALANCE = 7
}

export enum TOAST_MESSAGE {
    CONNECT_WALLET = "Please connect wallet!",
    FILL_FIELD = "Please fill required fields!",
    DATA_INCORRECT = "Please set data correctly!",
    WAITING_APPROVE_TRANSACTION = "Waiting approve transactions!",
    USER_REJECTED = "User rejeceted transaction!",
    UNEXPECTED_ERROR = "Unexpected error!",
    POOL_CREATED_SUCCESSFULLY = "Pool created successfully!",
    TRANSACTION_SUBMITTED = "Transaction submitted successfully!"

};

export enum DEFAULT_VALUE {
    MINIMUM_STAKE_AMOUNT = "0.0001",
    MAXIMUM_STAKE_AMOUNT = "0.0001",
    LOSS_PERCENTAGE = "10",
    MINIMUM_LOCKUP_PERIOD = "30"
}

type FactoryAddressType = {[chainId in SupportedChains]: string; }

export const FACTORY_ADDRESS: FactoryAddressType = {
    1: "0xB8e4E0dF38005893CEaf45a7911Fc7DA9Fe50aD1",
    5: "0xfBB400aC812541b05525bf511f560e1B1Ac9f0E3",
    56: "0xB8e4E0dF38005893CEaf45a7911Fc7DA9Fe50aD1",
    97: "0xB8e4E0dF38005893CEaf45a7911Fc7DA9Fe50aD1",
}

export interface PoolCollection {
    id: number,
    name: string,
    address: string,
    type: number,
    poolLogo: string,
    tokenALogo: string,
    tokenBLogo: string,
    createdAt: number
};

export interface TokenInfos {
    tokenAddress : string,
    tokenBalanceInfo: any,
    tokenStakeBalance: string,
    tokenRewardBalance: string
    stakeTokenAddress: string,
    rewardTokenAddress: string,
    minStakeAmount: string,
    maxStakeAmount: string
  }

export const FIREBASE_DATABASE_NAME = "pool";
