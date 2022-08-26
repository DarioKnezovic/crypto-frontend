import React, {useState, useMemo, useEffect} from "react";

import PropTypes from 'prop-types';
import utils from "../../utils";
import "./Table.css";
import Pagination from "./Pagination/Pagination";

const Table = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortedKey, setSortedKey] = useState('');
    const [ascendingSort, setAscendingSort] = useState(true);

    useEffect(() => {
        if (props.columns[0]) {
            setSortedKey(props.columns[0].key)
        }
    }, [props.columns])

    /*
     * Compare two values in objects dynamically depends on defined sortedKey.
     * @param first Object
     * @param second Object
     *
     * @return Number
     */
    const compareTwoObjects = (first, second) => {
        // Check is property number
        if (typeof first[sortedKey] === "number" && typeof second[sortedKey] === "number") {
            return ascendingSort ? second[sortedKey] - first[sortedKey] : first[sortedKey] - second[sortedKey];
        }

        // Check is property string, but not Date
        if (!(Date.parse(first[sortedKey]) && Date.parse(second[sortedKey]))) {
            return ascendingSort ? first[sortedKey].localeCompare(second[sortedKey]) : second[sortedKey].localeCompare(first[sortedKey]);
        }

        return ascendingSort ? new Date(second[sortedKey]) - new Date(first[sortedKey]) : new Date(first[sortedKey]) - new Date(second[sortedKey]);
    }

    /*
     * Slice data depends on current page.
     *
     * @return void
     */
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * props.pageSize;
        const lastPageIndex = firstPageIndex + props.pageSize;
        return props.data.sort((first, second) => compareTwoObjects(first, second)).slice(firstPageIndex, lastPageIndex);
    }, [currentPage, props.data, sortedKey, ascendingSort]);

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
    const displaySortIcon = (column) => {
        if (column.key !== sortedKey) {
            return;
        }
        const sortIconFilename = ascendingSort ? 'sort-down.svg' : 'sort-up.svg';

        return (
            <img
                src={require("../../assets/icons/table/" + sortIconFilename)}
                className="column-icon"
                alt="Column icon"/>
        )
    }

    /*
     * On user click change sort type (ascending or descending).
     * @param column Object
     *
     * @return void
     */
    const changeSortTypeOrSortedKey = (column) => {
        if (column.key !== sortedKey) {
            setSortedKey(column.key)
            setAscendingSort(true)
            return;
        }

        setAscendingSort(prevState => !prevState)
    }

    /*
     * Render table header from passed column property.
     *
     * @return HTMLElement
     */
    const renderTableHeader = () => {
        return props.columns.map((column, index) => (
            <th key={index}
                className={column.key === sortedKey ? 'sorted' : ''}
                onClick={() => changeSortTypeOrSortedKey(column)}>
                {displaySortIcon(column)} {column.name}
            </th>
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
