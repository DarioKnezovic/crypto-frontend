/*
 * Function which convert string to kebab case
 * @param str String
 *
 * @return String
 */
const toKebabCase = (str) => {
    if (typeof str !== "string") {
        return ''
    }

    return str &&
            str
            .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            .map(x => x.toLowerCase())
            .join('-');
}

/*
 * Function which convert reverse value of currency or in our case USD.
 * Example: 1USD is equal 0,000043BTC and how much is 1BTC?
 * @param value Integer
 *
 * @return Float
 */
const getUSDValueFromCryptoCurrency = (cryptoValue, usdValue) => {

    if (typeof cryptoValue !== "number" || typeof usdValue !== "number") {
        return 0
    }

    return cryptoValue/usdValue;
}

/*
 * Format date in DD/MM/YYYY hh:mm
 * @param date String
 *
 * @return String
 */
const formatDate = (date) => {
    if (typeof date !== "string") {
        return ''
    }

    const formattedDate = new Date(date);
    if (!isValidDate(formattedDate)) {
        return '';
    }

    const year = formattedDate.getFullYear();
    let month = formattedDate.getMonth() + 1; // Months start at 0!
    let day = formattedDate.getDate();
    let hour = formattedDate.getUTCHours();
    let minutes = formattedDate.getUTCMinutes();

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    if (hour < 10) hour = '0' + hour;
    if (minutes < 10) minutes = '0' + minutes;

    return day + '/' + month + '/' + year + ' ' + hour + ':' + minutes;
}

/*
 * Check is valid date.
 * @param Date
 *
 * @return Boolean
 */
const isValidDate = (d) => {
    return d instanceof Date && !isNaN(d);
}

export default {
    toKebabCase,
    getUSDValueFromCryptoCurrency,
    formatDate
}
