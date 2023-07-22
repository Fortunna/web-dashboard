

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


const convertTimeStamptoDateUTC = (timestamp: number) => {
    if (!timestamp)
        return "";
        
    const dt = new Date(timestamp);
    const date = `${dt.getUTCFullYear()}-${(dt.getUTCMonth() + 1).toString().padStart(2, '0')}-${dt.getUTCDate().toString().padStart(2, '0')} ${dt.getUTCHours().toString().padStart(2, '0')}:${dt.getUTCMinutes().toString().padStart(2, '0')}:${dt.getUTCSeconds().toString().padStart(2, '0')}`;
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
export {
    formatDate,
    convertTimeStamptoDateUTC,
    checkAddressValidation,
    makeCostUnit
}