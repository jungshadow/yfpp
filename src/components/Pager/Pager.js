import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { data } from 'jquery';

const Pager = (props) => {
    const [pageIndex, setPageIndex] = useState(0);
    const [previousIndex, setPreviousIndex] = useState(0);

    const handleClickMore = () => {
        const currentIndex = pageIndex;
        const newIndex = currentIndex + 10 > props.data.length - 1 ? props.data.length - 1 : currentIndex + 10;

        setPreviousIndex(currentIndex);
        setPageIndex(newIndex);
    };

    const renderMoreLink = () => {
        let locations = props.data;

        if (locations.length > 1 && pageIndex + 1 !== locations.length) {
            return (
                <div>
                    <button type="button" className="showMoreLink" onClick={handleClickMore}>
                        {pageIndex > 0 ? 'These are' : 'This is'} the closest {pageIndex > 0 ? pageIndex + 1 : ' '}
                        {pageIndex > 0 ? ' locations' : 'location'} of {locations.length} sites.
                        {pageIndex + 1 === locations.length ? ' ' : ' Click here to show more.'}
                    </button>
                </div>
            );
        }
        return null;
    };

    const renderList = () => {
        if (pageIndex === 0) {
            return React.cloneElement(props.children, { data: props.data[pageIndex] });
        }

        const nextResults = props.data.filter((item, index) => index > previousIndex && index <= pageIndex);

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
            {renderList()}
            {renderMoreLink()}
        </div>
    );
};

Pager.propTypes = {};

export default Pager;
