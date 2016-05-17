// Import dependencies 
import React from 'react';
import ReactDOM from 'react-dom';

import autobind from 'autobind-decorator';

@autobind

/**
 * Search Form Component
 *
 * @class PartySelect
 * @extends React.Component
 */
 class PartySelect extends React.Component {

 	onChangeHandler() {

 		this.props.updateFilterText(this.refs.partySelect.value);
 	}

 	// buildSelectOptions() {

 	// 	const contests= this.props.candidates;
 	// 	var parties =[];

 	// 	Object.keys(contests).map(function(key) {
 	// 		if(contests[key].candidates) {

 	// 			contests[key].candidates.map(function(currentValue, index){
 	// 				parties.push(<option>contests[key].candidates[index].party</option>);
 	// 			}) 


 	// 		}
 	// 	});
 	// 	console.log(parties);
 	// }

	/**
	 * Renders search form
	 *
	 * @method render
	 * @return {object} search component markup
	 */
	 render() {


	 	return (
	 		<form action=""  >
	 		
	 		<select name="" id="" ref="partySelect" onChange={this.onChangeHandler}>
	 		<option value='all'>Show All</option>
	 		<option value='rep'>Republican</option>
	 		<option value='dem'>Democrat</option>
	 		<option value='non'>Nonpartisan</option>
	 		</select>
	 		</form>
	 		)
	 }


	};

	export default PartySelect;