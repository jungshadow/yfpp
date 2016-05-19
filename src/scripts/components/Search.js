// Import dependencies 
import React from 'react';
import ReactDOM from 'react-dom';

import autobind from 'autobind-decorator';

@autobind

/**
 * Search Form Component
 *
 * @class Search
 * @extends React.Component
 */
class Search extends React.Component {

	fetchData(e) {

		e.preventDefault();
		
		var config = {
			'key': 'AIzaSyCm5MGxuhRo7mNmhRlfXlU66OS6Ny-ZPpQ',
			'address': this.refs.address.value
		};


		$.ajax({
			//url: 'https://www.googleapis.com/civicinfo/v2/voterinfo?callback=?',
			url: '/test_data.json',
			type: "GET",
			dataType: 'json',
			data: config,
			success: function(data) {
				this.props.updateResults(data);
				this.setState({isActive: false});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	}

	/**
	 * Renders search form
	 *
	 * @method render
	 * @return {object} search component markup
	 */
	render() {
		
		return (
			<form className="searchForm" action="" ref="searchForm" onSubmit={this.fetchData} >
				<input className="searchForm-input" type="search" ref="address" placeholder="EG. 1600 Pennsylvania Ave NW, Washington, DC" />
				<input className="searchForm-submit" type="submit" value="submit"/>
			</form>
			)
	}


};

export default Search;