import React from 'react';

import "./TextInput.css";

const TextInput = () => {
    return (
        <div className="input-group">
            <label>Amount</label>
            <input className="text-input" type="text" />
        </div>
    )
}

export default TextInput;
