<div></div>// Import dependencies 
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
			<li>
				<div className="card">
					<div className="card-bd">
						<h3 className="hdg hdg_3">{locations.address.locationName}</h3>
						<div>{locations.address.line1}</div>
						<div>{locations.address.line2}</div>
						<div>{locations.address.city}, {locations.address.state} {locations.address.zip}</div>
						<div>{locations.pollingHours}</div>
					</div>
					<div className="card-ft"><ul className="actions">
						<li className="actions-item">
							<span className="actions-item-title">Share</span>
							<div className="actions-item-links">
							<ul className="hList">
								<li>
									<a href="#">Twitter</a>
								</li>
								<li>
									<a href="#">Facebook</a>
								</li>
							</ul></div>
						</li>
						<li className="actions-item">
							<span className="actions-item-title">Map It</span>
							<div className="actions-item-links">
							
									<a href="#">Map</a>
								
							</div>
						</li>
					</ul></div>
				</div>
			</li>
			)
	}

};

export default PollingPlaceResults;