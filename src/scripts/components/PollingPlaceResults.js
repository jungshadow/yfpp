// Import dependencies 
import React from 'react';
import ReactDOM from 'react-dom';

import Actions from './Actions';

import helpers from '../helpers';


/**
 * Polling Place Results Component
 *
 * @class PollingPlaceResults
 * @extends React.Component
 */
class PollingPlaceResults extends React.Component {

    /**
     * Renders polling place results list items
     *
     * @method render
     * @return {object} polling place results component markup
     */
    render() {

        const locations = this.props.pollingLocations;

        return (
            <li>
                <div className="card">
                    <div className="card-bd">
	                <h3 className="hdg mix-hdg_capitalize">{helpers.fucktify(locations.address.locationName)}</h3>
                        <div><span className="txt mix-txt_capitalize">{helpers.lowerCase(locations.address.line1)}</span></div>
                        <div><span className="txt mix-txt_capitalize">{helpers.lowerCase(locations.address.line2)}</span></div>
                        <div><span className="txt mix-txt_capitalize">{helpers.lowerCase(locations.address.city)}, {locations.address.state} {locations.address.zip}</span></div>
                        <div>{locations.pollingHours}</div>
                    </div>
                    <div className="card-ft">
                        <Actions location={locations.address} />
                    </div>
                </div>
            </li>
            )
    }

};

export default PollingPlaceResults;
