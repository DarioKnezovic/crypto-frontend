import React from "react";

import PropTypes from 'prop-types';
import utils from "../../utils";
import "./Table.css";

const Table = (props) => {

    const checkColumnIcon = (column) => {
        if (!column.icon) {
            return;
        }

        return (
            <img
                src={require("../../assets/icons/table/"+column.icon)}
                className="column-icon"
                alt="Column icon"/>
        )
    }

    const renderTableHeader = () => {
        return props.columns.map((column, index) => (
            <th key={index}>{checkColumnIcon(column)} {column.name}</th>
        ))
    }

    const renderDataRow = (item, rowIndex) => {
        return (
            <tr key={rowIndex}>
                {props.columns.map((column, index) =>
                    <td className={column.valueAsClass ? utils.toKebabCase(item[column.key]) : ''} key={index}>{item[column.key]}</td>
                )}
            </tr>
        )
    }

    const renderData = () => {
        return props.data.map((item, index) => renderDataRow(item, index))
    }

    return (
        <table className="data-table">
            <thead>
                <tr>
                    {renderTableHeader()}
                </tr>
            </thead>
            <tbody>
                {renderData()}
            </tbody>
        </table>
    )
}

Table.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired
}

export default Table;
