import React from 'react';

import "./Input.css";
import PropTypes from 'prop-types';

const Input = (props) => {
    return (
        <div className="input-group">
            <label>{props.label}</label>
            <input
                value={props.value || ''}
                onChange={(e) => props.handleChange(null, props.property, props.type === 'text' ? e.target.value : parseInt(e.target.value))}
                disabled={props.disabled}
                className="form-input"
                type={props.type} />
        </div>
    )
}

Input.defaultProps = {
    disabled: false,
    type: 'text',
}

Input.propTypes = {
    label: PropTypes.string.isRequired,
    property: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    handleChange: PropTypes.func.isRequired,
    type: PropTypes.string,
    disabled: PropTypes.bool
}

export default Input;
