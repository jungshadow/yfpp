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
function Search(props) {
    const API_DEV_VOTER_INFO_URL = process.env.PUBLIC_URL + process.env.REACT_APP_API_DEV_VOTER_INFO_URL;
    const API_DEV_REPRESENTATIVES_URL = process.env.PUBLIC_URL + process.env.REACT_APP_API_DEV_REPRESENTATIVES_URL;
    const API_URL = process.env.REACT_APP_API_URL;
    const dispatch = useContext(DispatchContext);
    const { isActive, searchToggleIsOpen } = useContext(AppContext);
    const [searchValue, setsearchValue] = useState('');
    const windowSize = useWindowSize();

    const handleOnSearch = (val) => {
        setsearchValue(val);
    };

    const getRequestURL = function(route, requestParams) {
        const baseParams = {
            key: process.env.REACT_APP_API_KEY,
        };

        switch (process.env.NODE_ENV) {
            case 'development':
                return route === 'voterinfo' ? API_DEV_VOTER_INFO_URL : API_DEV_REPRESENTATIVES_URL;

            default:
                return `${API_URL}/${route}?${helpers.buildQueryString({ ...baseParams, ...requestParams })}`;
        }
    };

    const fetchData = async (e) => {
        e.preventDefault();

        const requests = [getLocations(searchValue), getRepresentatives(searchValue)];

        let [locations, representatives] = await Promise.all(requests);

        analytics.success(locations);
        dispatch({ type: 'UPDATE_SEARCH_RESULTS', data: locations });
        dispatch({ type: 'UPDATE_REPRESENTATIVES_RESULTS', data: representatives });

        // this.showEasterEgg(searchValue);
    };

    async function getLocations(searchValue) {
        const requestParams = {
            address: searchValue,
        };

        const requestURL = getRequestURL('voterinfo', requestParams);

        try {
            const response = await fetch(requestURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            const locations = await response.json();
            return locations;
        } catch (error) {
            console.log(error);

            const errorMessage = error;
            console.log(errorMessage.error.message);
            analytics.failure(errorMessage.error.message);
            props.onErrorHandler();
        }
    }

    async function getRepresentatives(searchValue) {
        const requestParams = {
            address: searchValue,
        };

        const requestURL = getRequestURL('representatives', requestParams);
        try {
            const response = await fetch(requestURL);
            const representatives = await response.json();
            return representatives;
        } catch (error) {
            console.log(error);

            const errorMessage = error;
            console.log(errorMessage.error.message);
            analytics.failure(errorMessage.error.message);
            props.onErrorHandler();
        }
    }

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
