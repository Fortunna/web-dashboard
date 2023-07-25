export enum SupportedChains {
    ETH_MAINNET = 1,
    GOERLI = 5,
    BSC_MAINNET = 56,
    BSC_TESTNET = 97
}

export enum TOAST_MESSAGE {
    CONNECT_WALLET = "Please connect wallet!",
    FILL_FIELD = "Please fill required fields!",
    DATA_INCORRECT = "Please set data correctly!",
    WAITING_APPROVE_TRANSACTION = "Waiting approve transactions!",
    USER_REJECTED = "User rejeceted transaction!",
    UNEXPECTED_ERROR = "Unexpected error!",
    TRANSACTION_SUBMITTED = "Pool created successfully!"
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
    5: "0xb556487f2D631cF1FbC2240e779E6C1Db8BeE90D",
    56: "0xB8e4E0dF38005893CEaf45a7911Fc7DA9Fe50aD1",
    97: "0xB8e4E0dF38005893CEaf45a7911Fc7DA9Fe50aD1",
}
