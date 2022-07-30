import React from 'react';

import "./TextInput.css";
import PropTypes from 'prop-types';

const TextInput = (props) => {
    return (
        <div className="input-group">
            <label>{props.label}</label>
            <input disabled={props.disabled} className="text-input" type="text" />
        </div>
    )
}

TextInput.defaultProps = {
    disabled: false,
}

TextInput.propTypes = {
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool
}

export default TextInput;
