// Import dependencies
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import analytics from 'analytics';
import helpers from 'helpers';
import Autocomplete from 'components/Autocomplete/Autocomplete';
import { AppContext, DispatchContext } from 'appReducer';

/**
 * Search Form Component
 *
 * @class Search
 * @extends React.Component
 */
function Search(props) {
    const API_URL_DEV = process.env.PUBLIC_URL + process.env.REACT_APP_API_DEV_URL;
    const API_URL = process.env.REACT_APP_API_URL;
    const dispatch = useContext(DispatchContext);
    const [searchValue, setsearchValue] = useState('');

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
                debugger;
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

    return (
        <form className={'searchForm '} action="" onSubmit={fetchData}>
            <Autocomplete placeholder="EG. 1600 Pennsylvania Ave NW, Washington, DC 20006" onSearch={handleOnSearch} onChange={errorRemove} value={searchValue} />
            <button className="searchForm-submit" type="submit">
                Search
            </button>
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
