import React, {useContext} from "react";

import "./History.css";
import Table from "../Table/Table";
import DataMobile from "./DataMobile/DataMobile";
import CurrencyRatesContext from "../../context/CurrencyRates";
import utils from "../../utils";
import DateInput from "../DateInput/DateInput";
import Button from "../Button/Button";

const History = () => {
    const currencyRatesCtx = useContext(CurrencyRatesContext);

    /*
     * Update `dateFilter` object received from DateInput component
     * @param property String
     * @param value String
     *
     * @return void
     */
    const updateDateFilter = (property, value) => {
        currencyRatesCtx.setDateFilter(prevState => ({
            ...prevState,
            [property]: value
        }))
    }

    /*
     * Dispatch event for changing `filterEnabled` value
     *
     * @return void
     */
    const triggerFilter = () => {
        currencyRatesCtx.changeFilterEnabled(prevState => !prevState)
    }

    const columns = [
        {
            name: 'Date & Time',
            key: 'date',
            format: utils.formatDate,
        },
        {
            name: 'Currency From',
            key: 'currency_from'
        },
        {
            name: 'Amount 1',
            key: 'amount_one'
        },
        {
            name: 'Currency To',
            key: 'currency_to'
        },
        {
            name: 'Amount 2',
            key: 'amount_two'
        },
        {
            name: 'Type',
            key: 'type',
            valueAsClass: true
        }
    ];

    /*
     * If `filterEnabled` is false then show all history exchanges, but if is true then filter it using `dateFilter`
     */
    const filteredHistory = () => {
        if (!currencyRatesCtx.filterEnabled) {
            return currencyRatesCtx.history
        }

        return currencyRatesCtx.history.filter(item => {
            let filterPass = true
            const date = new Date(item.date).setHours(0,0,0)
            if (currencyRatesCtx.dateFilter.from_date) {
                filterPass = filterPass && (new Date(currencyRatesCtx.dateFilter.from_date).setHours(0,0,0) <= date)
            }
            if (currencyRatesCtx.dateFilter.to_date) {
                filterPass = filterPass && (new Date(currencyRatesCtx.dateFilter.to_date).setHours(0,0,0) >= date)
            }

            return filterPass;
        })
    }

    return (
        <div className="history">
            <h1 className="title">History</h1>

            <div className="date-filter">
                <DateInput
                    value={currencyRatesCtx.dateFilter.from_date}
                    property="from_date"
                    handleChange={updateDateFilter}
                    label='From date' />
                <DateInput
                    value={currencyRatesCtx.dateFilter.to_date}
                    minDate={currencyRatesCtx.dateFilter.from_date}
                    property="to_date"
                    handleChange={updateDateFilter}
                    label='To date' />
                <Button clickHandler={triggerFilter} label={currencyRatesCtx.filterEnabled ? 'Clear' : 'Filter'} type="secondary" />
            </div>
            <Table columns={columns} data={filteredHistory()} filterEnabled={currencyRatesCtx.filterEnabled} />
            <DataMobile data={filteredHistory()} />
        </div>
    )
}

export default History;
