// Import dependencies
import React from 'react';
import ReactDOM from 'react-dom';

import autobind from 'autobind-decorator';
import analytics from '../analytics';
import $ from 'jquery';

@autobind

/**
 * Search Form Component
 *
 * @class Search
 * @extends React.Component
 */
class Search extends React.Component {

    /**
     * Handles post-render actions
     *
     * @method componentDidMount
     */
    componentDidMount() {
        /* Add Google Autocomplete */
        const options = {
            types: ['address'],
            componentRestrictions: { country: 'us' }
        };

        const input = $('.searchForm-input')[0];
        new window.google.maps.places.Autocomplete(input, options);
    }

    fetchData(e) {
        e.preventDefault();

        var config = {
            'key': 'AIzaSyCm5MGxuhRo7mNmhRlfXlU66OS6Ny-ZPpQ',
            'address': this.refs.address.value
        }

        $.ajax({
            url: 'https://www.googleapis.com/civicinfo/v2/voterinfo?',
            //url: '/test_data_san_fran.json',
            //url: '/test_data_errors.json',
            type: "GET",
            dataType: 'json',
            data: config,
            success: function(data) {
                analytics.success(data);
                this.props.updateResults(data);
            }.bind(this),
            error: function(xhr, status, err) {
                analytics.failure(xhr.responseJSON);
                this.props.onErrorHandler();

            }.bind(this)
        });
    }

    errorRemove() {

        this.props.onErrorRemoveHandler();
    }

    /**
     * Renders search form
     *
     * @method render
     * @return {object} search component markup
     */
    render() {

        return (
            <form className={'searchForm ' + this.props.activeClassName} action="" ref="searchForm" onSubmit={this.fetchData} >
            <input className="searchForm-input" type="search" ref="address" placeholder="EG. 1600 Pennsylvania Ave NW, Washington, DC 20006" onChange={this.errorRemove}/>
                <button className="searchForm-submit" type="submit">Search</button>
            </form>
            )

    }
};

// set up propType validation
Search.propTypes = {
    activeClassName: React.PropTypes.string,
    onErrorHandler: React.PropTypes.func,
    onErrorRemoveHandler: React.PropTypes.func,
    updateResults: React.PropTypes.func,
}

export default Search;
