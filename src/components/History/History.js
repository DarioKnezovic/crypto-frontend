import React, { useContext, useState } from "react";

import "./History.css";
import Table from "../Table/Table";
import DataMobile from "./DataMobile/DataMobile";
import CurrencyRatesContext from "../../context/CurrencyRates";
import utils from "../../utils";
import DateInput from "../DateInput/DateInput";
import Button from "../Button/Button";

const History = () => {
    const currencyRatesCtx = useContext(CurrencyRatesContext);
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(null);

    const columns = [
        {
            name: 'Date & Time',
            icon: 'sort.svg',
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

    const filterByDate = () => {

    }

    return (
        <div className="history">
            <h1 className="title">History</h1>

            <div className="date-filter">
                <DateInput
                    value={fromDate}
                    handleChange={setFromDate}
                    label='From date' />
                <DateInput
                    value={toDate}
                    handleChange={setToDate}
                    label='From date' />
                <Button clickHandler={filterByDate} label="Filter" type="secondary" />
            </div>
            <Table columns={columns} data={currencyRatesCtx.history} />
            <DataMobile data={currencyRatesCtx.history} />
        </div>
    )
}

export default History;
