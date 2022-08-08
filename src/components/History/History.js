import React, { useContext } from "react";

import "./History.css";
import Table from "../Table/Table";
import DataMobile from "./DataMobile/DataMobile";
import CurrencyRatesContext from "../../context/CurrencyRates";
import utils from "../../utils";

const History = () => {
    const currencyRatesCtx = useContext(CurrencyRatesContext);

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

    return (
        <div className="history">
            <h1 className="title">History</h1>

            <Table columns={columns} data={currencyRatesCtx.history} />
            <DataMobile data={currencyRatesCtx.history} />
        </div>
    )
}

export default History;
