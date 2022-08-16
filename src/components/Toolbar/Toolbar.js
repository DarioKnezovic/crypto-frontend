import React, {useState, useContext, useEffect} from 'react';

import "./Toolbar.css";
import Select from "../Select/Select";
import Input from "../Input/Input";
import Button from "../Button/Button";
import constants from "../../constants";
import utils from "../../utils";
import CurrencyRatesContext from "../../context/CurrencyRates";

const exchangeData = {
    [constants.EXCHANGE_FORM_KEYS.CURRENCY_FROM]: '',
    [constants.EXCHANGE_FORM_KEYS.AMOUNT_ONE]: 0,
    [constants.EXCHANGE_FORM_KEYS.CURRENCY_TO]: '',
    [constants.EXCHANGE_FORM_KEYS.AMOUNT_TWO]: 0
}

const Toolbar = () => {
    const [exchange, setExchange] = useState(exchangeData);
    const currencyRatesCtx = useContext(CurrencyRatesContext);

    /*
     * Check is BTC or ETH from currency_from.
     *
     * @return String
     */
    const checkCryptoFromAmount = () => {
        if (exchange.currency_from === constants.CRYPTO_CURRENCIES[0].value) {
            return constants.CURRENCY_RATE_BACKEND_PAYLOAD.CURRENCY_ONE_RATE;
        }

        if (exchange.currency_from === constants.CRYPTO_CURRENCIES[1].value) {
            return constants.CURRENCY_RATE_BACKEND_PAYLOAD.CURRENCY_TWO_RATE;
        }

        return '';
    }

    /*
     * When is changed value of amount_one, we have to convert with cryptocurrency specified in currency_from it and place in amount_two.
     * @param formValue String
     *
     * @return void
     */
    const updateAmountTwoValue = () => {
        const currencyRateKey = checkCryptoFromAmount();

        const currencyRate = currencyRatesCtx.currencyRates[currencyRateKey];
        if (currencyRate) {
            const amountTwoValue = utils.getUSDValueFromCryptoCurrency(parseInt(exchange.amount_one), currencyRate);
            setExchange(prevState => ({
                ...prevState,
                [constants.EXCHANGE_FORM_KEYS.AMOUNT_TWO]: amountTwoValue
            }))
        }
    }

    /*
     * Handle value change from inputs.
     * @param event Event
     * @param property String
     * @param value String
     *
     * @return void
     */
    const handleChange = (event, property, value) => {
        const formValue = event && event.target && event.target.value ? event.target.value : value;

        setExchange(prevState => ({
            ...prevState,
            [property]: formValue
        }))
    }

    /*
     * If is changed currency_from and amount_one update amount_two value.
     */
    useEffect(() => {
        updateAmountTwoValue()
    }, [exchange.currency_from])

    useEffect(() => {
        updateAmountTwoValue()
    }, [exchange.amount_one])

    /*
     * After click on Save remove saved exchanged data.
     *
     * @return void
     */
    const saveExchange= () => {
        currencyRatesCtx.updateHistory(exchange)
        setExchange(exchangeData)
    }

    return (
        <div className="toolbar">
            <h1 className="title">Exchange</h1>

            <div className="flex-group">
                <Select
                    property={constants.EXCHANGE_FORM_KEYS.CURRENCY_FROM}
                    value={exchange.currency_from}
                    handleChange={handleChange}
                    label="Currency from"
                    options={constants.CRYPTO_CURRENCIES} />
                <Input
                    property={constants.EXCHANGE_FORM_KEYS.AMOUNT_ONE}
                    value={exchange.amount_one}
                    handleChange={handleChange}
                    type="number"
                    label="Amount" />
                <div className="equals-sign">=</div>
                <Select
                    property={constants.EXCHANGE_FORM_KEYS.CURRENCY_TO}
                    value={exchange.currency_to}
                    handleChange={handleChange}
                    type="number"
                    label="Currency to"
                    options={constants.CURRENCIES}
                    disabled={true} />
                <Input
                    property={constants.EXCHANGE_FORM_KEYS.AMOUNT_TWO}
                    value={exchange.amount_two}
                    handleChange={handleChange}
                    label="Amount"
                    disabled={true}
                />

                <Button clickHandler={() => saveExchange()} label="Save" />
            </div>
        </div>
    )
}

export default Toolbar;
