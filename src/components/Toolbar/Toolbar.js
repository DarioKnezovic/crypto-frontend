import React from 'react';

import "./Toolbar.css";
import Select from "../Select/Select";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import constants from "../../constants";

const Toolbar = () => {
    return (
        <div className="toolbar">
            <h1 className="title">Exchange</h1>

            <div className="flex-group">
                <Select label="Currency from" options={constants.CRYPTO_CURRENCIES} />
                <TextInput label="Amount" />
                <div className="equals-sign">=</div>
                <Select label="Currency from" options={constants.CURRENCIES} disabled={true} />
                <TextInput label="Amount" />

                <Button label="Save" />
            </div>
        </div>
    )
}

export default Toolbar;
