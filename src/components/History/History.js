import React from "react";

import "./History.css";
import Table from "../Table/Table";
import DataMobile from "./DataMobile/DataMobile";

const History = () => {

    const columns = [
        {
            name: 'Date & Time',
            icon: 'sort.svg',
            key: 'date'
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

    const data = [
        {
            date: '22/01/2022 20:45',
            currency_from: 'Bitcoin',
            amount_one: '1',
            currency_to: 'USD',
            amount_two: '48000,00',
            type: 'Live price'
        },
        {
            date: '22/01/2022 15:45',
            currency_from: 'Bitcoin',
            amount_one: '2',
            currency_to: 'EUR',
            amount_two: '2.56565656',
            type: 'Exchanged'
        }
    ]

    return (
        <div className="history">
            <h1 className="title">History</h1>

            <Table columns={columns} data={data} />
            <DataMobile data={data} />
        </div>
    )
}

export default History;
