// Import dependencies
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import analytics from 'analytics';
import helpers from 'helpers';
import Autocomplete from 'components/Autocomplete/Autocomplete';
import { AppContext, DispatchContext } from 'appReducer';
import './search.scss';
import useWindowSize from 'hooks/useWindowSize';
import SearchIcon from 'components/Icons/SearchIcon';
import CloseIcon from 'components/Icons/CloseIcon';
/**
 * Search Form Component
 *
 * @class Search
 * @extends React.Component
 */
function Search() {
    const API_URL_DEV = process.env.PUBLIC_URL + process.env.REACT_APP_API_DEV_URL;
    const API_URL = process.env.REACT_APP_API_URL;
    const dispatch = useContext(DispatchContext);
    const { isActive, searchToggleIsOpen } = useContext(AppContext);
    const [searchValue, setsearchValue] = useState('');
    const windowSize = useWindowSize();

    const handleOnSearch = (val) => {
        setsearchValue(val);
    };

    const getRequestURL = function(requestParams) {
        switch (process.env.NODE_ENV) {
            case 'development':
                return API_URL_DEV;

            default:
                return API_URL + helpers.buildQueryString(requestParams);
        }
    };

    const fetchData = (e) => {
        e.preventDefault();

        const searchQuery = searchValue;
        const requestParams = {
            key: process.env.REACT_APP_API_KEY,
            address: searchQuery,
        };

        const requestURL = getRequestURL(requestParams);

        // if (searchQuery.toLowerCase() === 'fuck off') {
        //     this.props.onFuckOffHandler();
        //     // attempt to dismiss virtual keyboard
        //     this.searchInput.current.blur();

        //     return;
        // }

        // this.props.onFuckOffCloseHandler();

        fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                return response.json(); //we only get here if there is no error
            })
            .then((response) => {
                console.log(response);
                analytics.success(response);
                dispatch({ type: 'UPDATE_SEARCH_RESULTS', data: response });
            })
            .catch((error) => {
                error.json().then((errorMessage) => {
                    console.log(errorMessage.error.message);
                    analytics.failure(errorMessage.error.message);
                    this.props.onErrorHandler();
                });
            });
    };

    const errorRemove = () => {
        this.props.onErrorRemoveHandler();
    };

    const getSearchClassName = () => {
        return classnames({ searchForm: true, 'searchForm--hasSearchVal': isActive, 'searchForm--isClosed': !searchToggleIsOpen && isActive });
    };

    const shouldShowSearchToggle = isActive && windowSize.width < 768;

    const setsearchToggleIsOpen = () => {
        dispatch({ type: 'SET_SEARCH_TOGGLE_STATUS', status: !searchToggleIsOpen });
    };

    return (
        <form className={getSearchClassName()} action="" onSubmit={fetchData}>
            <div className="searchForm__input">
                <Autocomplete placeholder="EG. 1600 Pennsylvania Ave NW, Washington, DC 20006" onSearch={handleOnSearch} onChange={errorRemove} value={searchValue} isActive={isActive} />
                <button className="searchForm__submit" type="submit">
                    <span className="searchForm__text">Search</span>
                    <span className="searchForm__icon">
                        <SearchIcon />
                    </span>
                </button>
            </div>
            {shouldShowSearchToggle && (
                <button type="button" className="searchForm__searchToggle" onClick={setsearchToggleIsOpen}>
                    <span className="searchForm__icon">{searchToggleIsOpen ? <CloseIcon /> : <SearchIcon />}</span>
                </button>
            )}
        </form>
    );
}

// set up propType validation
Search.propTypes = {
    activeClassName: PropTypes.string,
    onErrorHandler: PropTypes.func,
    onErrorRemoveHandler: PropTypes.func,
    updateResults: PropTypes.func,
};

export default Search;
