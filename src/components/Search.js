// Import dependencies
import React from 'react';
import PropTypes from 'prop-types';
import analytics from '../analytics';
import helpers from '../helpers';

/**
 * Search Form Component
 *
 * @class Search
 * @extends React.Component
 */
class Search extends React.Component {
    API_URL_DEV = process.env.PUBLIC_URL + process.env.REACT_APP_API_DEV_URL;
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);
        this.searchForm = React.createRef();
        this.searchInput = React.createRef();

        this.state = {
            searchQuery: '',
        };
    }

    /**
     * Handles post-render actions
     *
     * @method componentDidMount
     */
    componentDidMount() {
        if (process.env.NODE_ENV !== 'development') {
        }
    }

    getRequestURL(route, requestParams) {
        const baseParams = {
            key: process.env.REACT_APP_API_KEY,
        };
        switch (process.env.NODE_ENV) {
            // case 'development':
            //     return this.API_URL_DEV;

            default:
                return `${this.API_URL}/${route}?${helpers.buildQueryString({ ...baseParams, ...requestParams })}`;
        }
    }

    fetchData = async e => {
        e.preventDefault();

        const searchQuery = this.searchInput.current.value;
        const requests = [this.getLocations(searchQuery), this.getRepresentatives(searchQuery)];

        let [locations, representatives] = await Promise.all(requests);

        console.log(locations, representatives);
        analytics.success(locations);
        this.props.updateElectionResults(locations);

        this.showEasterEgg(searchQuery);
    };

    errorRemove = () => {
        this.props.onErrorRemoveHandler();
    };

    showEasterEgg = searchQuery => {
        if (searchQuery.toLowerCase() === 'fuck off') {
            this.props.onFuckOffHandler();
            // attempt to dismiss virtual keyboard
            this.searchInput.current.blur();

            return;
        }

        this.props.onFuckOffCloseHandler();
    };

    getLocations = async searchQuery => {
        const requestParams = {
            address: searchQuery,
        };

        const requestURL = this.getRequestURL('voterinfo', requestParams);

        return fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw response;
                }

                return response.json();
            })
            .catch(error => {
                console.log(error);

                const errorMessage = error;
                console.log(errorMessage.error.message);
                analytics.failure(errorMessage.error.message);
                this.props.onErrorHandler();
            });
    };

    getRepresentatives = async searchQuery => {
        const requestParams = {
            address: searchQuery,
        };

        const requestURL = this.getRequestURL('representatives', requestParams);
        return fetch(requestURL).then(response => response.json());
    };
    /**
     * Renders search form
     *
     * @method render
     * @return {object} search component markup
     */
    render() {
        return (
            <form className={'searchForm ' + this.props.activeClassName} action="" ref={this.searchForm} onSubmit={this.fetchData}>
                <input className="searchForm-input" type="search" ref={this.searchInput} placeholder="EG. 1600 Pennsylvania Ave NW, Washington, DC 20006" onChange={this.errorRemove} />
                <button className="searchForm-submit" type="submit">
                    Search
                </button>
            </form>
        );
    }
}

// set up propType validation
Search.propTypes = {
    activeClassName: PropTypes.string,
    onErrorHandler: PropTypes.func,
    onErrorRemoveHandler: PropTypes.func,
    updateElectionResults: PropTypes.func,
};

export default Search;
