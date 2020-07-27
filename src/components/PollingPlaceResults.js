// Import dependencies
import React from 'react';

import PollingPlaceCard from 'components/PollingPlaceCard';

/**
 * Polling Place Results Component
 *
 * @class PollingPlaceResults
 * @extends React.Component
 */
class PollingPlaceResults extends React.Component {
    generateCards(index) {
        var cards = [],
            locations = this.props.pollingLocations;

        for (var i = 0; i <= index; i++) {
            cards.push(<PollingPlaceCard pollingLocation={locations[i]} key={i} electionDay={this.props.electionInfo.electionDay} />);
        }

        return cards;
    }

    renderMoreLink() {
        let locations = this.props.pollingLocations;

        if (locations.length > 1 && this.props.index + 1 !== locations.length) {
            return (
                <div>
                    <button type="button" className="link" onClick={this.props.handleChange}>
                        {this.props.index > 0 ? 'These are' : 'This is'} the closest {this.props.index > 0 ? this.props.index + 1 : ' '}
                        {this.props.index > 0 ? ' locations' : 'location'} of {locations.length} sites.
                        {this.props.index + 1 === locations.length ? ' ' : ' Click here to show more.'}
                    </button>
                </div>
            );
        }
    }

    /**
     * Renders polling place results list items
     *
     * @method render
     * @return {object} polling place results component markup
     */
    render() {
        var locations = this.props.pollingLocations,
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

export default PollingPlaceResults;
