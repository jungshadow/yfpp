
// Import dependencies 
import React from 'react';
import ReactDOM from 'react-dom';
import autobind from 'autobind-decorator';

import Search from './Search';
import PollingPlaceResults from './PollingPlaceResults';

@autobind

/**
 * Outer component for YFPP application
 * 
 * @class App
 * @extends React.Component
 * 
 */
class App extends React.Component {

	/**
	 * Sets initial state 
	 * @constructor
	 */
	constructor() {
		super();

		// sets initial state with empty results arrays
		// that will be dynamically populated from search results
		this.state= {
			pollingLocations: [],
			earlyVoteSites: [],
			contests: []
		}
	};

	/**
	 * Sets state with results from search 
	 *
	 * @method updateResults
	 * @param  {object} data object returned from API
	 */
	updateResults(data) {

		this.setState({
			pollingLocations: data.pollingLocations,
			earlyVoteSites: data.earlyVoteSites,
			contests: data.contests
		});
	};

	/**
	 * Renders Polling Place Results data
	 *
	 * @method renderResults
	 * @param  {string} key unique index
	 * @return {bject}  PollinPlaceResults component markup
	 */
	renderResults(key) {
		
		return <PollingPlaceResults key={key} pollingLocations={this.state.pollingLocations[key]}  />
	};

	/**
	 * Renders application to the DOM
	 *
	 * @method render
	 * @return {object} App component markup
	 */
	render() {
		return (
			<div>
				<div>{this.state.data}</div>
				<Search updateResults={this.updateResults} />
				<ul className="results">
					{Object.keys(this.state.pollingLocations).map(this.renderResults)}
				</ul>
			</div>
			)
	};

};

export default App;



