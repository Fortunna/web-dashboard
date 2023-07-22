import { SupportedChains } from "@/constants";
import { ethers} from "ethers";
import ERC20TokenABI from "@/assets/ERC20ABI.json";
import BEP20TokenABI from "@/assets/BEP20ABI.json";

export async function getTokenInfo(address: string, network: number, rpc: string) {

    let symbol, decimal;
    let tokenContract:ethers.Contract;

    const provider = new ethers.JsonRpcProvider(rpc, network);
    if (network === SupportedChains.ETH_MAINNET ||
        network === SupportedChains.GOERLI) {
        tokenContract = new ethers.Contract(address, ERC20TokenABI, provider);
    } else if (network === SupportedChains.BSC_TESTNET) {
        tokenContract = new ethers.Contract(address, BEP20TokenABI, provider);
    }

    try {
        symbol = await tokenContract!.symbol();
        decimal = await tokenContract!.decimals();
    } catch (error) {

    }

    return [symbol, decimal];
}
