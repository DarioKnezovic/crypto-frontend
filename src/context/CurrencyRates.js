import React, {useState, createContext, useEffect} from "react";

import { io } from "socket.io-client";
import utils from "../utils";
import constants from "../constants";

const CurrencyRatesContext = createContext({
    currencyRates: {},
    history: [],
    updateHistory: (data) => {},
    dateFilter: {},
    setDateFilter: () => {},
    filterEnabled: false,
    changeFilterEnabled: () => {}
})

const DATE_FILTER_INIT = {
    from_date: null,
    to_date: null
}

export const CurrencyRatesContextProvider = (props) => {
    const [currencyRates, setCurrencyRates] = useState({})
    const [history, setHistory] = useState([])
    const [socket, setSocket] = useState(null)
    const [dateFilter, setDateFilter] = useState(DATE_FILTER_INIT)
    const [filterEnabled, changeFilterEnabled] = useState(false)

    useEffect(() => {
        const newSocket = io(constants.SOCKET_URL, {secure: true});
        setSocket(newSocket)

        newSocket.on(constants.SOCKET_EVENTS.LATEST_CURRENCY_RATES, (data) => {
            setCurrencyRates(data)
            updateHistoryForLivePrice(data)
            newSocket.emit(constants.SOCKET_EVENTS.GET_CHANGES_HISTORY)
        })

        newSocket.on(constants.SOCKET_EVENTS.EXCHANGES_HISTORY, (data) => {
            updateHistoryWithExchanges(data)
        })

        newSocket.on(constants.SOCKET_EVENTS.CURRENCY_RATES_UPDATE, (data) => {
            updateCurrencyPriceInHistory(data)
        })

        return () => {
            newSocket.off(constants.SOCKET_EVENTS.CONNECT);
            newSocket.off(constants.SOCKET_EVENTS.LATEST_CURRENCY_RATES);
            newSocket.off(constants.SOCKET_EVENTS.EXCHANGES_HISTORY);
            newSocket.off(constants.SOCKET_EVENTS.CURRENCY_RATES_UPDATE);
        };
    }, [])

    /*
     * When `filterEnabled` is changed to false, set `dateFilter` object to init
     */
    useEffect(() => {
        if (!filterEnabled) {
            setDateFilter(DATE_FILTER_INIT)
        }
    }, [filterEnabled])

    /*
     * Send exchange history to the backend.
     * @param data Object
     *
     * @return void
     */
    const updateHistory = (data) => {
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

        historyDataItem.date = fetchedHistoryData.time;
        historyDataItem.currency_from = fetchedHistoryData[`currency_${currencyIndex}_name`];
        historyDataItem.amount_one = 1;
        historyDataItem.currency_to = fetchedHistoryData.base;
        historyDataItem.amount_two = utils.getUSDValueFromCryptoCurrency(1, fetchedHistoryData[`currency_${currencyIndex}_rate`]);
        historyDataItem.type = constants.HISTORY_TYPES.LIVE_PRICE;

        return historyDataItem;
    }

    /*
     * Parse data received from backend side to adjust live price of cryptocurrencies
     * @param data Object
     *
     * @return Array
     */
    const parseLivePriceData = (data) => {
        let historyData = [];

        historyData[0] = createHistoryDataFromLivePrice(data, 'one');
        historyData[1] = createHistoryDataFromLivePrice(data, 'two');

        return historyData;
    }

    /*
     * Update history of live price received from backend side
     * @param data Object
     *
     * @return void
     */
    const updateHistoryForLivePrice = (data) => {
        setHistory(parseLivePriceData(data));
    }

    /*
     * Append exchange data in exchange state.
     * @param data Object
     *
     * @return void
     */
    const updateHistoryWithExchanges = (data) => {
        setHistory(prevState => [...new Set([prevState[0], prevState[1], ...data])])
    }

    /*
     * Adjust live price when is received from backend
     * @param data Object
     *
     * @return void
     */
    const updateCurrencyPriceInHistory = (data) => {
        let historyData = parseLivePriceData(data);

        setHistory(prevState => [...historyData, ...prevState.slice(2)])
    }

    return <CurrencyRatesContext.Provider value={{currencyRates, history, updateHistory, dateFilter, setDateFilter, filterEnabled, changeFilterEnabled}}>{props.children}</CurrencyRatesContext.Provider>
}

export default CurrencyRatesContext;
