// Import dependencies
import React from 'react';

import EarlyVoteSiteCard from 'components/EarlyVoteSiteCard';

/**
 * Early Vote Site Results Component
 *
 * @class EarlyVoteSiteResults
 * @extends React.Component
 */
class EarlyVoteSiteResults extends React.Component {
    generateCards(index) {
        var cards = [],
            locations = this.props.earlyVoteSites;

        for (var i = 0; i <= index; i++) {
            cards.push(<EarlyVoteSiteCard earlyVoteSite={locations[i]} key={i} />);
        }

        return cards;
    }

    renderMoreLink() {
        let locations = this.props.earlyVoteSites;

        if (locations.length > 1 && this.props.index + 1 !== locations.length) {
            return (
                <div>
                    <button type="button" className="showMoreLink" onClick={this.props.handleChange}>
                        {this.props.index > 0 ? 'These are' : 'This is'} the closest {this.props.index > 0 ? this.props.index + 1 : ' '}
                        {this.props.index > 0 ? ' locations' : 'location'} of {locations.length} sites.
                        {this.props.index + 1 === locations.length ? ' ' : ' Click here to show more.'}
                    </button>
                </div>
            );
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

        if (locations.length > 0) {
            cards = this.generateCards(index);
        }

        return (
            <ul className="vList">
                {cards}
                <li>{this.renderMoreLink()}</li>
            </ul>
        );
    }
}

export default EarlyVoteSiteResults;
