import React from "react";

import PropTypes from 'prop-types';
import utils from "../../utils";
import "./Table.css";

const Table = (props) => {

    /*
     * Check is exists icon for specific column. If yes, then show it.
     * @param column Object
     *
     * @return undefined|HTMLElement
     */
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

    /*
     * Render table header from passed column property.
     *
     * @return HTMLElement
     */
    const renderTableHeader = () => {
        return props.columns.map((column, index) => (
            <th key={index}>{checkColumnIcon(column)} {column.name}</th>
        ))
    }

    /*
     * Render row dynamically from column value key.
     * @param item Object
     * @param rowIndex Integer
     *
     * @param HTMLElement
     */
    const renderDataRow = (item, rowIndex) => {
        return (
            <tr className={rowIndex % 2 === 0 ? 'white-bg' : 'grey-bg'} key={rowIndex}>
                {props.columns.map((column, index) =>
                    <td className={column.valueAsClass ? utils.toKebabCase(item[column.key]) : ''} key={index}>{item[column.key]}</td>
                )}
            </tr>
        )
    }

    /*
     * Render data from passed property called data.
     *
     * return HTMLElement
     */
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
