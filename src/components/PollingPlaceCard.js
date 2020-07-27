// Import dependencies
import React from 'react';
import moment from 'moment';
import Actions from 'components/Actions';

import helpers from 'helpers';

/**
 * Polling Place Card Component
 *
 * @class PollingPlaceCard
 * @extends React.Component
 */
class PollingPlaceCard extends React.Component {
    /**
     * Renders polling place card list items
     *
     * @method render
     * @return {object} polling place results component markup
     */
    render() {
        const locations = this.props.pollingLocation;
        const electionDay = this.props.electionDay;

        return (
            <li>
                <div className="card">
                    <div className="card-bd">
                        <div className="card-hd">
                            <h2 className="hdg hdg_2 mix-hdg_capitalize mix-hdg_red mix-hdg_headline">
                                Election Day Polling Place <small className="mix-hdg_dark">{moment(electionDay).format('MMMM Do')}</small>
                            </h2>
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

export default PollingPlaceCard;
