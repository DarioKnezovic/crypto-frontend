import React from "react";

import "./DataMobile.css";
import utils from "../../../utils";
import PropTypes from 'prop-types';

const DataMobile = (props) => {

    /*
     * Render history data using array.map
     *
     * @return void
     */
    const renderData = () => {
        return props.data.map((item, index) => (
            <div className="history-data" key={index}>
                <div className="headline">
                    <div>
                        <span className="currency-from">{item.currency_from}</span> <span className="currency-to">-> {item.currency_to}</span>
                    </div>
                    <div className={'type-dot ' + utils.toKebabCase(item.type)}>&nbsp;</div>
                </div>
                <div className="amount-content">
                    <span className="amount-text">Amount</span> <span className="amount-value">{item.currency_to} {item.amount_two}</span>
                </div>
            </div>
        ))
    }

    return (
        <div className="history-data-mobile">
            {renderData()}
        </div>
    )
}

DataMobile.propTypes = {
    data: PropTypes.array.isRequired
}

export default DataMobile;
