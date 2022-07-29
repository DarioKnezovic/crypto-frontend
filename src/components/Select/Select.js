import React, {useState} from 'react';

import "./Select.css";
import PropTypes from 'prop-types';

const Select = (props) => {
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(0);

    const toggleOptions = () => {
        setIsOptionsOpen(!isOptionsOpen);
    };

    const setSelectedThenCloseDropdown = (index) => {
        setSelectedOption(index);
        setIsOptionsOpen(false);
    };

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
                id="button-select"
                type="button"
                disabled={props.disabled}
                aria-haspopup="listbox"
                aria-expanded={isOptionsOpen}
                className={isOptionsOpen ? "expanded" : ""}
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
    disabled: PropTypes.bool
}

export default Select;
