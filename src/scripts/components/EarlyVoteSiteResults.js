// Import dependencies
import React from 'react';
import ReactDOM from 'react-dom';

import moment from 'moment'

import EarlyVoteSiteCard from './EarlyVoteSiteCard';

import helpers from '../helpers';


/**
 * Early Vote Site Results Component
 *
 * @class EarlyVoteSiteResults
 * @extends React.Component
 */
class EarlyVoteSiteResults extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        //pass
    }

    /**
     * Takes a dateString and attempts to parse it into a Date object
     *
     * @method getLocationDate
     * @arg dateString - a string representing a date
     * @return {Date} Date object either parsed from the string or Date.now()
     */
    isOpenSite(location) {
        return moment(location.endDate).isSameOrBefore(moment(), 'day');
    }

    generateCards(index) {
        var cards = [],
            numberOfValidSites = index,
            locations = this.props.earlyVoteSites;

        for(var i=0; i <= index; i++) {
            if(this.isOpenSite(locations[i])) {
                cards.push(<EarlyVoteSiteCard earlyVoteSite={locations[i]} key={i} />);
            } else {
                numberOfValidSites--;
            }
        }

        return cards;
    }

    renderMoreLink() {
        let locations = this.props.earlyVoteSites;

        if(locations.length > 1) {
            return (
                <div>
                    <a onClick={this.props.handleChange}>
                        {this.props.index > 0 ? "These are" : "This is"} the closest {this.props.index > 0 ? this.props.index + 1 : " "}
                        {this.props.index > 0 ? " locations" : "location"} of {locations.length} sites.
                        {this.props.index + 1===locations.length ? " " : " Click here to show more."}</a>
                </div>
            )
        }
    }

    /**
     * Renders Early Vote Site results list items
     *
     * @method render
     * @return {object} Early Vote Site results component markup
     */
    render() {
        var locations = this.props.earlyVoteSites,
            index = this.props.index,
            cards = [];

        if(locations.length > 0) {
            cards = this.generateCards(index);
        }

        return (
            <div>
                <ul className="vList">
                    {cards}
                </ul>
                {this.renderMoreLink()}
            </div>
        )
    }

};

export default EarlyVoteSiteResults;
