// Import dependencies
import React from 'react';
import PropTypes from 'prop-types';

import DropOffLocationCard from './DropOffLocationCard';

/**
 * Drop Off Location Results Component
 *
 * @class DropOffLocationResults
 * @extends React.Component
 */
class DropOffLocationResults extends React.Component {
    componentWillUnmount() {
        //pass
    }

    generateCards(index) {
        var cards = [],
            locations = this.props.dropOffLocations;

        for (var i = 0; i <= index; i++) {
            cards.push(<DropOffLocationCard dropOffLocation={locations[i]} key={i} />);
        }

        return cards;
    }

    renderMoreLink() {
        let locations = this.props.dropOffLocations;

        if (locations.length > 1 && this.props.index + 1 !== locations.length) {
            return (
                <div>
                    <a className="showMoreLink" onClick={this.props.handleChange}>
                        {this.props.index > 0 ? 'These are' : 'This is'} the closest {this.props.index > 0 ? this.props.index + 1 : ' '}
                        {this.props.index > 0 ? ' locations' : 'location'} of {locations.length} sites.
                        {this.props.index + 1 === locations.length ? ' ' : ' Click here to show more.'}
                    </a>
                </div>
            );
        }
    }

    /**
     * Renders Drop Off Location results list items
     *
     * @method render
     * @return {object} Drop Off Location results component markup
     */
    render() {
        var locations = this.props.dropOffLocations,
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

// set up propType validation
DropOffLocationResults.propTypes = {
    dropOffLocations: PropTypes.array,
};

export default DropOffLocationResults;
