import React from 'react';

import "./Select.css";

const Select = (props) => {
    return (
        <div className="input-group">
            <label>Currency from</label>
            <select>
                <option>Bitcoin</option>
                <option>Ethernum</option>
            </select>
        </div>
    )
}

export default Select;
