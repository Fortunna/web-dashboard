import { BalanceShowDecimals } from "@/constants";


const formatDate = (dateString: string | Date | null) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date();

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear().toString().slice(-2);
    let hour = date.getHours();
    const minute = date.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12 || 12; // Convert hour to 12-hour format

    const formattedDate = `${day} ${month} '${year}, ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${ampm}`;

    return formattedDate
}


const convertTimeStamptoDate = (timestamp: number) => {
    if (!timestamp)
        return "";
        
    const dt = new Date(timestamp);
    const date = `${(dt.getMonth()+1).toString().padStart(2, '0')}/${dt.getDate().toString().padStart(2, '0')}/${dt.getFullYear()}`;
    return date;
}

const checkAddressValidation = (address: string) => {
    if (address.length < 43 && address.startsWith("0", 0))
        return true;
    return false;
}

const makeCostUnit = (cost: string, symbol: string|undefined) => {
    return cost.slice(0, 4) + " " + symbol;
}

const removeForwardZero = (original: string) => {
    return "0x" + original.slice(26);
}

const convertUnderDecimals = (amount:string, decimal = BalanceShowDecimals.WALLET_BALANCE) => {
    const value = parseFloat(amount).toFixed(decimal);
    return value.toString();
}
export {
    formatDate,
    convertTimeStamptoDate,
    checkAddressValidation,
    removeForwardZero,
    makeCostUnit,
    convertUnderDecimals
}