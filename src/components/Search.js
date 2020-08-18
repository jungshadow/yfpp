// Import dependencies
import React from 'react';
import PropTypes from 'prop-types';
import analytics from '../analytics';
import helpers from '../helpers';
import Autocomplete from './Autocomplete'

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
            autocompleteEvent: '',
            autocompleteValue: ''
        };
    }

    logEvent() {
        const {autocompleteEvent, autocompleteValue} = this.state;
        console.log(`Event: ${autocompleteEvent} : ${autocompleteValue}`);
    }

    handleOnSelect(val) {
        this.setState({autocompleteEvent: 'onSelect'});
        this.setState({autocompleteValue: val}, () => { this.logEvent() });
    }

    handleOnSearch(val) {
        this.setState({autocompleteEvent: 'onSearch'});
        this.setState({autocompleteValue: val}, () => { this.logEvent() });
    }
    /**
     * Handles post-render actions
     *
     * @method componentDidMount
     */
    componentDidMount() {
        if (process.env.NODE_ENV !== 'development') {
            // this.initAutocomplete();
        }
    }

    getRequestURL(requestParams) {
        switch (process.env.NODE_ENV) {
            case 'development':
                return this.API_URL_DEV;

            default:
                return this.API_URL + helpers.buildQueryString(requestParams);
        }
    }

    fetchData = e => {
        e.preventDefault();

        const searchQuery = this.searchInput.current.value;
        const requestParams = {
            key: process.env.REACT_APP_API_KEY,
            address: searchQuery,
        };

        const requestURL = this.getRequestURL(requestParams);

        if (searchQuery.toLowerCase() === 'fuck off') {
            this.props.onFuckOffHandler();
            // attempt to dismiss virtual keyboard
            this.searchInput.current.blur();

            return;
        }

        this.props.onFuckOffCloseHandler();

        fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }).then(response => {
            if (!response.ok) {
                throw response;
            }
            return response.json(); //we only get here if there is no error
        }).then(response => {
            console.log(response);
            analytics.success(response);
            this.props.updateResults(response);
        }).catch(error => {
            error.json().then(errorMessage => {
                console.log(errorMessage.error.message);
                analytics.failure(errorMessage.error.message);
                this.props.onErrorHandler();
            });
        });
    };

    errorRemove = () => {
        this.props.onErrorRemoveHandler();
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
                <Autocomplete
                    onSelect={this.handleOnSelect.bind(this)}
                    onSearch={this.handleOnSearch.bind(this)}
                    dataSource={['one', 'two', 'three']}
                />
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
    updateResults: PropTypes.func,
};

export default Search;
