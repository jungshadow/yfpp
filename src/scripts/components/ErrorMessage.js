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
     * Renders error message based on available info
     *
     * TODO: this should be broken up into a few different methods and refactored
     * @method renderMessage
     * @return {object} returns error message based on available info
     */
    renderMessage() {
        // these are both the local_jurisdiction and state
        // electionAdministrationBody properties (respectively) of the
        // Civic Info API JSON response
        const leoInfo = this.props.leoInfo;
        const seoInfo = this.props.seoInfo;

        var phoneMessage = 'call this fucking number:';
        var PhoneElementFrag;

        var urlMessage = 'visit this fucking website:'
        var UrlElementFrag;

        // preference is for local election information
        var leoPhone;
        var leoUrl;
        var leoAddress;

        // the state info is a fallback for where info is missing
        var seoPhone;
        var seoUrl;
        var seoAddress;

        var sentence = 'If you want to get to the bottom of this bullshit, ' +
            'you may want to ';

        var reasons = [];

        if(Object.getOwnPropertyNames(leoInfo).length > 0) {

            if(leoInfo.electionOfficials && leoInfo.electionOfficials.length > 0
                && leoInfo.electionOfficials[0].officePhoneNumber) {
                leoPhone = leoInfo.electionOfficials[0].officePhoneNumber;
                PhoneElementFrag = <span>{phoneMessage} <a href={'tel:' + leoPhone}>{leoPhone}</a></span>;
                reasons.push(PhoneElementFrag);
            }

            if(leoInfo.electionInfoUrl) {
                leoUrl = leoInfo.electionInfoUrl;
            }
        }

        if(Object.getOwnPropertyNames(seoInfo).length > 0) {
            if(seoInfo.electionOfficials && seoInfo.electionOfficials.length > 0
                && seoInfo.electionOfficials[0].officePhoneNumber
                && !leoPhone) {
                PhoneElementFrag = <span>{phoneMessage} <a href={'tel:' + seoPhone}>{seoPhone}</a></span>;
                reasons.push(PhoneElementFrag);
            }
        }

        return (
            <span className="txt mix-txt_capitalize">We couldn't find any fucking data. In the immortal words of The Great Bard, DJ Khaled: &quot;Congratulations! You just played yourself.&quot;<br />
                {(() => {
                    if(reasons.length === 0) {
                        return (
                            <span className="txt mix-txt_capitalize">'There are currently no elections associated with the fucking address you\'re trying to use. Get your shit together and try another one.'</span>
                        )
                    } else if(reasons.length === 1) {
                        return (
                            <span className="txt mix-txt_capitalize">{reasons[0]}</span>
                        )
                    } else if(reasons.length === 2) {
                        return (
                            <span className="txt mix-txt_capitalize">{reasons[0]} and {reasons[1]}</span>
                        )
                    } else if(reasons.length === 3) {
                        return (
                            <span className="txt mix-txt_capitalize">{reasons[0]}, {reasons[1]}, or {reasons[3]}</span>
                        )
                    }
                })()}
            </span>
        )
    }

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
                    <div>{this.renderMessage()}</div>
                </div>
            </div>

        )
    }
};

export default ErrorMessage;
