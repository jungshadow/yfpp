// Import dependencies 
import React from 'react';
import ReactDOM from 'react-dom';


/**
 * Results Component
 *
 * @class Results
 * @extends React.Component
 */
class Results extends React.Component {

	/**
	 * Renders polling place results list items
	 *
	 * @method render
	 * @return {object} polling place results component markup
	 */
	render() {

		const locations = this.props.pollingLocations;

		console.log(locations);

		return (
			<ul className="results">
				{Object.keys(this.state.pollingLocations).map(this.renderResults)}
			</ul>
			)
	}

};

export default Results;