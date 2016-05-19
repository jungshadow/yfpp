// Import dependencies 
import React from 'react';
import ReactDOM from 'react-dom';


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
			<li className="results_pollingplace">
				<h3 className="hdg hdg_3">{locations.address.locationName}</h3>
				<div>{locations.address.city}</div>
				<div>{locations.address.line1}</div>
				<div>{locations.address.line2}</div>
				<div>{locations.address.state}</div>
				<div>{locations.address.zip}</div>
				<div>{locations.pollingHours}</div>
			</li>
			)
	}

};

export default PollingPlaceResults;