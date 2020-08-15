// Import dependencies
import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import Actions from './Actions';

import helpers from '../helpers';

/**
 * Drop Off Location Card Component
 *
 * @class DropOffLocationCard
 * @extends React.Component
 */
class DropOffLocationCard extends React.Component {
    /**
     * Takes a dateString and attempts to parse it into a Date object
     *
     * @method getLocationDate
     * @arg dateString - a string representing a date
     * @return {Date} Date object either parsed from the string or Date.now()
     */
    getLocationDate(dateString) {
        var date = moment(dateString);

        return date.isValid() ? date : moment();
    }

    /**
     * Renders Drop Off Location card list items
     *
     * @method render
     * @return {object} Drop Off Location results component markup
     */
    render() {
        const locations = this.props.dropOffLocation;

        /*(
            <li>
                <div className="card">
                    <div className="card-bd">
                        <div className="card-hd">
                            <h2 className="hdg hdg_2 mix-hdg_capitalize mix-hdg_red mix-hdg_headline">Drop Off Location <small className="mix-hdg_dark">{moment(this.getLocationDate(locations.startDate)).format('MMMM Do')} - {moment(locations.endDate).format('MMMM Do')}</small></h2>
                        </div>
                        <h3 className="hdg hdg_3 mix-hdg_capitalize">{helpers.fucktify(locations.address.locationName || locations.name || '')}</h3>
                        <div><span className="txt mix-txt_capitalize">{helpers.lowerCase(locations.address.line1)}</span></div>
                        <div><span className="txt mix-txt_capitalize">{helpers.lowerCase(locations.address.line2)}</span></div>
                        <div><span className="txt mix-txt_capitalize">{helpers.lowerCase(locations.address.city)}, {locations.address.state} {locations.address.zip}</span></div>
                        <div><strong>Polling Hours:</strong> {locations.pollingHours}</div>
                    </div>
                    <div className="card-ft">
                        <Actions location={locations.address} />
                    </div>
                </div>
            </li>
        )*/
        return (
            <li>
                <div className="card">
                    <div className="card-bd">
                        <div className="card-hd">
                            <h2 className="hdg hdg_2 mix-hdg_capitalize mix-hdg_red mix-hdg_headline">Drop Off Location</h2>
                        </div>
                        <h3 className="hdg hdg_3 mix-hdg_capitalize">{helpers.fucktify(locations.address.locationName)}</h3>
                        <div>
                            <span className="txt mix-txt_capitalize">{helpers.lowerCase(locations.address.line1)}</span>
                        </div>
                        <div>
                            <span className="txt mix-txt_capitalize">{helpers.lowerCase(locations.address.line2)}</span>
                        </div>
                        <div>
                            <span className="txt mix-txt_capitalize">
                                {helpers.lowerCase(locations.address.city)}, {locations.address.state} {locations.address.zip}
                            </span>
                        </div>
                        <div>
                            <strong>Polling Hours:</strong> {locations.pollingHours}
                        </div>
                    </div>
                    <div className="card-ft">
                        <Actions location={locations.address} />
                    </div>
                </div>
            </li>
        );
    }
}

// set up propType validation
DropOffLocationCard.propTypes = {
    dropOffLocation: PropTypes.object,
};

export default DropOffLocationCard;
