import React from 'react';

import "./Button.css";
import PropTypes from 'prop-types';

const Button = (props) => {
    return (
        <button onClick={props.clickHandler} className={"button button-" + props.type} disabled={props.disabled}>{props.label}</button>
    )
}

Button.defaultProps = {
    disabled: false,
    type: 'primary'
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    type: PropTypes.string
}

export default Button;
