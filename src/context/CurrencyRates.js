import React, {useState, createContext, useEffect} from "react";

import { io } from "socket.io-client";
import utils from "../utils";
import constants from "../constants";

const CurrencyRatesContext = createContext({
    currencyRates: {},
    history: [],
})

export const CurrencyRatesContextProvider = (props) => {
    const [currencyRates, setCurrencyRates] = useState({})
    const [history, setHistory] = useState([])

    useEffect(() => {
        const socket = io(constants.SOCKET_URL, {secure: true});

        socket.on(constants.SOCKET_EVENTS.LATEST_CURRENCY_RATES, (data) => {
            console.log(data)
            setCurrencyRates(data)
            updateHistoryForLivePrice(data)
        })
    }, [])

    const createHistoryDataFromLivePrice = (fetchedHistoryData, currencyIndex) => {
        let historyDataItem = {};

        historyDataItem.date = utils.formatDate(fetchedHistoryData.time);
        historyDataItem.currency_from = fetchedHistoryData[`currency_${currencyIndex}_name`];
        historyDataItem.amount_one = 1;
        historyDataItem.currency_to = fetchedHistoryData.base;
        historyDataItem.amount_two = utils.getReversedValue(fetchedHistoryData[`currency_${currencyIndex}_rate`]);
        historyDataItem.type = constants.HISTORY_TYPES.LIVE_PRICE;

        return historyDataItem;
    }

    const updateHistoryForLivePrice = (data) => {
        let historyData = [];

        historyData[0] = createHistoryDataFromLivePrice(data, 'one');
        historyData[1] = createHistoryDataFromLivePrice(data, 'two');

        setHistory(historyData);
    }

    return <CurrencyRatesContext.Provider value={{currencyRates, history}}>{props.children}</CurrencyRatesContext.Provider>
}

export default CurrencyRatesContext;
