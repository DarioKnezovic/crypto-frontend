import React, {useState, createContext, useEffect} from "react";

import { io } from "socket.io-client";
import utils from "../utils";
import constants from "../constants";

const CurrencyRatesContext = createContext({
    currencyRates: {},
    history: [],
    updateHistory: (data) => {},
})

export const CurrencyRatesContextProvider = (props) => {
    const [currencyRates, setCurrencyRates] = useState({})
    const [history, setHistory] = useState([])
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        const newSocket = io(constants.SOCKET_URL, {secure: true})
        setSocket(newSocket)

        newSocket.on(constants.SOCKET_EVENTS.LATEST_CURRENCY_RATES, (data) => {
            console.log(data)
            setCurrencyRates(data)
            updateHistoryForLivePrice(data)
        })

        newSocket.on(constants.SOCKET_EVENTS.EXCHANGES_HISTORY, (data) => {
            console.log(data)
        })
    }, [])

    /*
     * Send exchange history to the backend.
     * @param data Object
     *
     * @return void
     */
    const updateHistory = (data) => {
        console.log(data)
        socket.emit(constants.SOCKET_EVENTS.SAVE_EXCHANGE, data);
    }

    /*
     * Create data of live price for Bitcoin (index one) and Ethereum (index two).
     * @param fetchedHistoryData Object
     * @param currencyIndex string
     *
     * @return Object
     */
    const createHistoryDataFromLivePrice = (fetchedHistoryData, currencyIndex) => {
        let historyDataItem = {};

        historyDataItem.date = utils.formatDate(fetchedHistoryData.time);
        historyDataItem.currency_from = fetchedHistoryData[`currency_${currencyIndex}_name`];
        historyDataItem.amount_one = 1;
        historyDataItem.currency_to = fetchedHistoryData.base;
        historyDataItem.amount_two = utils.getUSDValueFromCryptoCurrency(1, fetchedHistoryData[`currency_${currencyIndex}_rate`]);
        historyDataItem.type = constants.HISTORY_TYPES.LIVE_PRICE;

        return historyDataItem;
    }

    /*
     * Update history of live price received from backend side
     * @param data Object
     *
     * @return void
     */
    const updateHistoryForLivePrice = (data) => {
        let historyData = [];

        historyData[0] = createHistoryDataFromLivePrice(data, 'one');
        historyData[1] = createHistoryDataFromLivePrice(data, 'two');

        setHistory(historyData);
    }

    return <CurrencyRatesContext.Provider value={{currencyRates, history, updateHistory}}>{props.children}</CurrencyRatesContext.Provider>
}

export default CurrencyRatesContext;
