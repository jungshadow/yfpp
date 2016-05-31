// Import dependencies 
import React from 'react';
import ReactDOM from 'react-dom';

import Actions from './Actions'


/**
 * Polling Place Results Component
 *
 * @class PollingPlaceResults
 * @extends React.Component
 */
class PollingPlaceResults extends React.Component {
    /**
     * Adds "fucking" in various places within a phrase, depending on the phrase
     * 
     * @method fucktify
     * @return {string} unsanitized phrase
     */
    fucktify(str) {
	if (str === undefined) {
	    str = "Some fucking building";
	} else {
	    // I need to standardize the character case because
	    // the data is chaos and indexOf uses strict equality
	    var str_arr = String(str).toLowerCase().trim().split(" ");

	    // assuming two or more words...
	    if (str_arr.length >= 2) {
		// ...check for the existence/index of "of"...
		var of_idx = str_arr.indexOf("of");
		if (of_idx > -1) {
		    // ...insert after "of" for great justice...
		    str_arr.splice(of_idx+1, 0, "fucking");
		} else {
		    // ...or just stick "fucking" between the 1st and 2nd words
		    str_arr.splice(1, 0, "fucking");
		}
	    } else {
		// else, start the word with "fucking"
		str_arr.splice(0, 0, "fucking");
	    }
	    // put that shit back together
	    str = str_arr.join(" ");
	}

	return str;
    }

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
	                <h3 className="hdg hdg_3">{this.fucktify(locations.address.locationName)}</h3>
                        <div>{locations.address.line1}</div>
                        <div>{locations.address.line2}</div>
                        <div>{locations.address.city}, {locations.address.state} {locations.address.zip}</div>
                        <div>{locations.pollingHours}</div>
                    </div>
                    <div className="card-ft">
                        <Actions />
                    </div>
                </div>
            </li>
            )
    }

};

export default PollingPlaceResults;
