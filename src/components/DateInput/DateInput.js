import React from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateInput.css";
import DatePickerIcon from "../../assets/icons/input/date-picker.svg";
import PropTypes from "prop-types";

const DateInput = (props) => {

    const CustomInput = React.forwardRef((props, ref) => {
        return (
            <>
                <label onClick={props.onClick} ref={ref}>
                    <img className="date-picker-icon" src={DatePickerIcon} alt="Date picker icon" />
                    <input onChange={props.onChange} className="date-input" type="text" value={props.value} />
                </label>
            </>
        );
    });

    return (
        <div className="date-picker-input">
            <p className="date-picker-label">
                {props.label}
            </p>
            <DatePicker selected={props.value}
                        minDate={props.minDate ? props.minDate : null}
                        onChange={(date) => props.handleChange(props.property, date)}
                        customInput={<CustomInput/>} />
        </div>
    )
}

DateInput.propTypes = {
    value: PropTypes.object,
    label: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    property: PropTypes.string.isRequired,
    minDate: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ])
}

export default DateInput;
