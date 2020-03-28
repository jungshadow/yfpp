// Import dependencies
import React from 'react';
import PropTypes from 'prop-types';
import analytics from '../analytics';
import APIService from '../services/APIService';

/**
 * Search Form Component
 *
 * @class Search
 * @extends React.Component
 */
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.searchForm = React.createRef();
        this.searchInput = React.createRef();

        this.state = {
            searchQuery: '',
        };
    }

    fetchData = async e => {
        e.preventDefault();
        try {
            const searchQuery = this.searchInput.current.value;
            const requests = [APIService.getLocations(searchQuery), APIService.getRepresentatives(searchQuery)];

            let [locations, representatives] = await Promise.all(requests);

            console.log(locations, representatives);
            if (locations) {
                analytics.success(locations);
                this.props.updateElectionResults(locations);
            }

            if (representatives) {
                this.props.updateRepresentativesResults(representatives);
            }

            this.showEasterEgg(searchQuery);
        } catch (error) {
            console.log('fetchData Error', error);

            console.error(error);
        }
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
