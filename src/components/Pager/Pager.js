import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './pager.scss';

const PAGER_OFFSET = 5;
const Pager = (props) => {
    const [pageIndex, setPageIndex] = useState(1);

    const generatePageNav = () => {
        debugger;
        if (props.data.length <= props.numberPerPage) {
            return null;
        }

        function getPagerLinkClass(index) {
            return index === pageIndex ? 'pager__link pager__link--isActive' : 'pager__link';
        }
        const pagesCount = Math.ceil(props.data.length / props.numberPerPage);
        let pagingLinks = [];

        for (let index = 1; index <= pagesCount; index++) {
            pagingLinks.push(
                <li key={`'pagerLink_${index}`}>
                    <button className={getPagerLinkClass(index)} onClick={() => setPageIndex(index)}>
                        {index}
                    </button>
                </li>
            );
        }

        if (pagesCount > PAGER_OFFSET) {
            let beginningPageOffset = pageIndex - PAGER_OFFSET;
            let endingPageOffset = pageIndex + PAGER_OFFSET;

            if (pageIndex <= PAGER_OFFSET) {
                beginningPageOffset = pageIndex - (PAGER_OFFSET + pageIndex);
                endingPageOffset = pageIndex + (PAGER_OFFSET * 2 - pageIndex);
            }
            if (pageIndex > pagesCount - PAGER_OFFSET) {
                beginningPageOffset = pageIndex - (PAGER_OFFSET * 2 - (pagesCount - pageIndex));
            }

            pagingLinks = pagingLinks.filter((link, index) => index + 1 > beginningPageOffset && index + 1 <= endingPageOffset);
        }

        return (
            <div className="pager">
                {pageIndex > 1 && (
                    <button className="pager__link pager__link--prev" onClick={() => setPageIndex(pageIndex - 1)}>
                        {'<'}
                    </button>
                )}
                <ol className="pager__links">{pagingLinks.map((link) => link)}</ol>
                {pageIndex < pagesCount && (
                    <button className="pager__link pager__link--next" onClick={() => setPageIndex(pageIndex + 1)}>
                        {'>'}
                    </button>
                )}
            </div>
        );
    };

    const getNextResults = () => {
        const nextResultsFilter = (item, index) => {
            const fromValue = pageIndex === 1 ? pageIndex : pageIndex * props.numberPerPage - props.numberPerPage + 1;
            const toValue = pageIndex * props.numberPerPage;

            return index + 1 >= fromValue && index + 1 <= toValue;
        };

        const nextResults = props.data.filter(nextResultsFilter);

        return (
            <ul className="vList">
                {nextResults.map((result, index) => (
                    <li key={`result_${index}`}>{React.cloneElement(props.children, { data: result })}</li>
                ))}
            </ul>
        );
    };

    return (
        <div>
            {getNextResults()}
            {generatePageNav()}
        </div>
    );
};

Pager.propTypes = {
    numberPerPage: PropTypes.number,
};

Pager.defaultProps = {
    numberPerPage: 5,
};

export default Pager;
