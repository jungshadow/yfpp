// Import dependencies
import React from 'react';
import ReactDOM from 'react-dom';

import moment from 'moment'

import Actions from './Actions';

import helpers from '../helpers';


/**
 * Early Vote Site Results Component
 *
 * @class EarlyVoteSiteResults
 * @extends React.Component
 */
class EarlyVoteSiteResults extends React.Component {

    /**
     * Renders Early Vote Site results list items
     *
     * @method render
     * @return {object} Early Vote Site results component markup
     */
    render() {

        const locations = this.props.earlyVoteSites;

        return (
            <li>
                <div className="card">
                    <div className="card-bd">
                        <div className="card-hd">
                            <h2 className="hdg hdg_2 mix-hdg_capitalize mix-hdg_red mix-hdg_headline">Early Vote Site <small className="mix-hdg_dark">{moment(new Date(locations.startDate)).format('MMMM Do')} - {moment(new Date(locations.endDate)).format('MMMM Do')}</small></h2>
                        </div>
	                    <h3 className="hdg hdg_3 mix-hdg_capitalize">{helpers.fucktify(locations.address.locationName)}</h3>
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
            )
    }

};

export default EarlyVoteSiteResults;
