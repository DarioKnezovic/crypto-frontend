import React from 'react';

import "./Button.css";
import PropTypes from 'prop-types';

const Button = (props) => {
    return (
        <button onClick={props.clickHandler} className="button" disabled={props.disabled}>{props.label}</button>
    )
}

Button.defaultProps = {
    disabled: false,
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
    disabled: PropTypes.bool
}

export default Button;
