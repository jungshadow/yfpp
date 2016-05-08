
// Import dependencies 
import React from 'react';
import ReactDOM from 'react-dom';

var App = React.createClass({

	getInitialState: function() {
		return { data: [] };
	},




	render: function() {
		return (
			<div>
			<div>{this.state.data}</div>
			<Search />
			</div>
			)
	}
});

var Search = React.createClass({

	fetchData: function(e) {

		e.preventDefault();
		
		var config = {
			'key': 'AIzaSyCm5MGxuhRo7mNmhRlfXlU66OS6Ny-ZPpQ',
			'address': this.refs.address.value
		};

		$.ajax({
			url: 'https://www.googleapis.com/civicinfo/v2/voterinfo?callback=?',
			type: "GET",
			dataType: 'jsonp',
			data: config,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	render: function() {

		return (
			<form action="" ref="searchForm" onSubmit={this.fetchData} >
				<input type="text" ref="address" placeholder="Search" />
				<input type="submit" value="submit"/>


			</form>
			)
	}
});

export default App;



