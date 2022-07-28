import React from 'react';

import "./Toolbar.css";
import Select from "../Select/Select";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";

const Toolbar = () => {
    return (
        <div className="toolbar">
            <h1 className="title">Exchange</h1>

            <Select />
            <TextInput />
            <Button />
        </div>
    )
}

export default Toolbar;
