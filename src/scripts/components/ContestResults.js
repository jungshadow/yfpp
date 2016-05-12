// Import dependencies 
import React from 'react';
import ReactDOM from 'react-dom';


/**
 * Contest Results Component
 *
 * @class PollingPlaceResults
 * @extends React.Component
 */
class ContestResults extends React.Component {

	/**
	 * Renders Contest results list items
	 *
	 * @method render
	 * @return {object} polling place results component markup
	 */
	render() {

		const contests = this.props.contests;

		console.log(contests);

		return (
			<li className="results_pollingplace">
				
			</li>
			)
	}

};

export default ContestResults;