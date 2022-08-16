import React, { useState } from "react";

import "./DataMobile.css";
import utils from "../../../utils";
import PropTypes from 'prop-types';
import Modal from "../../Modal/Modal";

const DataMobile = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});

    /*
     * Function get selected modal and trigger modal show
     * @param item Object
     *
     * @return void
     */
    const openModal = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    }

    /*
     * Function set show modal on false and remove selected item.
     *
     * @return void
     */
    const closeModal = () => {
        setShowModal(false);
        setSelectedItem({});
    }

    /*
     * Render history data using array.map
     *
     * @return void
     */
    const renderData = () => {
        return props.data.map((item, index) => (
            <div className="history-data" key={index} onClick={() => openModal(item)}>
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
        <React.Fragment>
            <Modal title="Exchange" show={showModal} onClose={closeModal}>

                {selectedItem &&
                    <React.Fragment>
                        <div className="selected-data">
                            <div className="title">Date & Time</div>
                            <div className="value">{selectedItem.date}</div>
                        </div>
                        <div className="selected-data">
                            <div className="title">Type</div>
                            <div className="value">{selectedItem.type}</div>
                        </div>
                        <div className="selected-data">
                            <div className="title">From</div>
                            <div className="value">{selectedItem.currency_from}</div>
                        </div>
                        <div className="selected-data">
                            <div className="title">To</div>
                            <div className="value">{selectedItem.currency_to}</div>
                        </div>
                        <div className="selected-data">
                            <div className="title">Amount</div>
                            <div className="value">{selectedItem.amount_one}</div>
                        </div>
                        <div className="selected-data">
                            <div className="title">Total amount</div>
                            <div className="value">{selectedItem.amount_two}</div>
                        </div>
                    </React.Fragment>
                }

                <button onClick={() => closeModal()} className="close-button">Close</button>
            </Modal>
            <div className="history-data-mobile">
                {renderData()}
            </div>
        </React.Fragment>
    )
}

DataMobile.propTypes = {
    data: PropTypes.array.isRequired
}

export default DataMobile;
