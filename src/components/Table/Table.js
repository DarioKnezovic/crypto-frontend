import React, {useState, useMemo, useEffect} from "react";

import PropTypes from 'prop-types';
import utils from "../../utils";
import "./Table.css";
import Pagination from "./Pagination/Pagination";

const Table = (props) => {
    const [currentPage, setCurrentPage] = useState(1);

    /*
     * Slice data depends on current page.
     *
     * @return void
     */
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * props.pageSize;
        const lastPageIndex = firstPageIndex + props.pageSize;
        return props.data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, props.data]);

    /*
     * Avoid bug when user is on the last page and filter data, in most cases it'll be blank data table.
     * So for that case we need to init current index.
     *
     * @return void
     */
    useEffect(() => {
        if (props.filterEnabled) {
            setCurrentPage(1)
        }
    }, [props.filterEnabled])

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
                    <td className={column.valueAsClass ? utils.toKebabCase(item[column.key]) : ''} key={index}>
                        {column.format ?
                            column.format(item[column.key]) :
                            item[column.key]
                        }
                    </td>
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
        return currentTableData.map((item, index) => renderDataRow(item, index))
    }

    return (
        <>
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
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={props.data.length}
                pageSize={props.pageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </>
    )
}

Table.defaultProps = {
    pageSize: 5,
    filterEnabled: false
}

Table.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    pageSize: PropTypes.number,
    filterEnabled: PropTypes.bool
}

export default Table;
