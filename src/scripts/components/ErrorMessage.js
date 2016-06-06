// Import dependencies 
import React from 'react';
import ReactDOM from 'react-dom';

import Actions from './Actions';

import helpers from '../helpers';


/**
 * Error Message Component
 *
 * @class ErrorMessage
 * @extends React.Component
 */
class ErrorMessage extends React.Component {

    /**
     * Renders error message when search fails
     *
     * @method render
     * @return {object} error message component markup
     */
    render() {

        return (
            
                <div className="card card_error">
                    <div className="card-bd">
	                <h3 className="hdg hdg_1 mix-hdg_headline">For Fuck's Sake</h3>
                        <div><span className="txt mix-txt_capitalize">There are currently no elections associated with the fucking address you're trying to use. Get your shit together and try another one.</span></div>
                    </div>
                </div>
            
            )
    }

};

export default ErrorMessage;
