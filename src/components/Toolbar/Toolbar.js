import React, { useState, useContext } from 'react';

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
     * When is changed value of amount_one, we have to convert with cryptocurrency specified in currency_from it and place in amount_two.
     * @param formValue String
     *
     * @return void
     */
    const updateAmountTwoValue = (formValue) => {
        const currencyRateKey = exchange.currency_from === constants.CURRENCY_SHORTCODES.BTC ?
            constants.CURRENCY_RATE_BACKEND_PAYLOAD.CURRENCY_ONE_RATE : constants.CURRENCY_RATE_BACKEND_PAYLOAD.CURRENCY_TWO_RATE;
        const currencyRate = currencyRatesCtx.currencyRates[currencyRateKey];
        if (currencyRate) {
            const amountTwoValue = utils.getUSDValueFromCryptoCurrency(parseInt(formValue), currencyRate);
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

        if (property === constants.EXCHANGE_FORM_KEYS.AMOUNT_ONE) {
            updateAmountTwoValue(formValue);
        }
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

                <Button clickHandler={() => currencyRatesCtx.updateHistory(exchange)} label="Save" />
            </div>
        </div>
    )
}

export default Toolbar;
