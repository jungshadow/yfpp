
// Import dependencies 
import React from 'react';
import ReactDOM from 'react-dom';
import autobind from 'autobind-decorator';

import Search from './Search';
import PollingPlaceResults from './PollingPlaceResults';
import ContestResults from './ContestResults';

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
	 * @method renderPollingPlaceResults
	 * @param  {string} key unique index
	 * @return {bject}  PollinPlaceResults component markup
	 */
	 renderPollingPlaceResults(key) {

	 	return <PollingPlaceResults key={key} pollingLocations={this.state.pollingLocations[key]}  />
	 };

	/**
	 * Renders Contest Results data
	 *
	 * @method renderContestResults
	 * @param  {string} key unique index
	 * @return {bject}  PollinPlaceResults component markup
	 */
	 renderContestResults(key) {

	 	return <ContestResults key={key} contests={this.state.contests[key]}  />
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
		 			{Object.keys(this.state.pollingLocations).map(this.renderPollingPlaceResults)}
		 		</ul>

		 		<ul className="results">
		 			{Object.keys(this.state.contests).map(this.renderContestResults)}
		 		</ul>
	 		</div>
	 		)
	 };

	};

	export default App;



