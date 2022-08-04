import React, {useEffect, useState} from 'react';

import "./Select.css";
import PropTypes from 'prop-types';

const Select = (props) => {
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(0);

    useEffect(() => {
        props.handleChange(null, props.property, props.options[selectedOption].value)
    }, [selectedOption])
    /*
     * Display or hide options.
     *
     * @return void
     */
    const toggleOptions = () => {
        setIsOptionsOpen(!isOptionsOpen);
    };

    /*
     * Store selected option index.
     * @param index Integer
     *
     * @return void
     */
    const setSelectedThenCloseDropdown = (index) => {
        setSelectedOption(index);
        setIsOptionsOpen(false);
    };

    /*
     * Handle event on list item.
     * @param index Integer
     *
     * @return void
     */
    const handleKeyDown = (index) => (e) => {
        switch (e.key) {
            case " ":
            case "SpaceBar":
            case "Enter":
                e.preventDefault();
                setSelectedThenCloseDropdown(index);
                break;
            default:
                break;
        }
    };

    /*
     * Handle event on button and unordered list.
     * @param e HTMLEvent
     *
     * @return void
     */
    const handleListKeyDown = (e) => {
        switch (e.key) {
            case "Escape":
                e.preventDefault();
                setIsOptionsOpen(false);
                break;
            case "ArrowUp":
                e.preventDefault();
                setSelectedOption(
                    selectedOption - 1 >= 0 ? selectedOption - 1 : props.options.length - 1
                );
                break;
            case "ArrowDown":
                e.preventDefault();
                setSelectedOption(
                    selectedOption === props.options.length - 1 ? 0 : selectedOption + 1
                );
                break;
            default:
                break;
        }
    };

    /*
     * Dynamic check specific select option have icon, if have display it
     * @param option Object
     *
     * @return undefined|HTMLElement
     */
    const showOptionIcon = (option) => {
        if (!option.icon) {
            return;
        }

        return (
            <img
                src={require("../../assets/icons/" + option.icon)}
                className="option-icon"
                alt={option.name} />
        )
    }

    return (
        <div className="input-group">
            <label>{props.label}</label>
            <button
                type="button"
                disabled={props.disabled}
                aria-haspopup="listbox"
                aria-expanded={isOptionsOpen}
                className={`button-select ${isOptionsOpen ? "expanded" : ""}`}
                onClick={toggleOptions}
                onKeyDown={handleListKeyDown}
            >
                {showOptionIcon(props.options[selectedOption])}
                {props.options[selectedOption].name}
            </button>
            <ul
                className={`options ${isOptionsOpen ? "show" : ""}`}
                role="listbox"
                aria-activedescendant={props.options[selectedOption].name}
                tabIndex="0"
                onKeyDown={handleListKeyDown}
            >
                {props.options.map((option, index) => (
                    <li
                        id={option.name}
                        key={index}
                        role="option"
                        aria-selected={selectedOption === index}
                        tabIndex={0}
                        onKeyDown={handleKeyDown(index)}
                        onClick={() => {
                            setSelectedThenCloseDropdown(index);
                        }}
                    >
                        {showOptionIcon(option)}
                        {option.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

Select.defaultProps = {
    disabled: false,
}

Select.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    property: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool
}

export default Select;
