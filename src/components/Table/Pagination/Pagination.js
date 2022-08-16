import React from 'react';
import { usePagination, DOTS } from './usePagination';
import ArrowIcon from "../../../assets/icons/table/arrow.svg";
import './pagination.css';

const Pagination = props => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <ul
            className={'pagination-container ' + className}
        >
            <li
                className={`arrows pagination-item ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={onPrevious}
            >
                <img className="arrow left" src={ArrowIcon} alt="arrow-icon" />
                <span className="pagination-text">Prev</span>
            </li>
            {paginationRange.map((pageNumber, index) => {
                if (pageNumber === DOTS) {
                    return <li key={index} className="pagination-item dots">&#8230;</li>;
                }

                return (
                    <li
                        key={index}
                        className={`pagination-item ${pageNumber === currentPage ? 'selected' : ''}`}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li
                className={`arrows pagination-item ${currentPage === lastPage ? 'disabled' : ''}`}
                onClick={onNext}
            >
                <span className="pagination-text">Next</span>
                <img className="arrow right" src={ArrowIcon} alt="arrow-icon" />
            </li>
        </ul>
    );
};

export default Pagination;
