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
     * Renders error messages based on available info
     *
     * @method given a message, href, anchorText, and messageType
     *     {'tel', 'url', 'addr'}, this method will create an HTML fragment
     * @return {object} returns error message based on available info
     */
    createMessageFragment(message, href, anchorText, messageType) {
        var ElementFrag = '';

        switch (messageType) {
            case 'tel':
                ElementFrag = <span>{message} <a href={'tel:' + href}>{anchorText}</a></span>;
                break;
            case 'url':
                ElementFrag = <span>{message} <a href={href}>{anchorText}</a></span>;
                break;
            case 'addr':
                var url = 'https://maps.google.com/?q=' + href;
                ElementFrag = <span>{message} <a href={url}>{anchorText}</a></span>;
                break;
            default:
                ElementFrag = <span>You&apos;re not calling this method correctly.</span>;
        }

        return ElementFrag;
    }

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

        var phoneMessage = 'call this fucking number,';
        var urlMessage = 'visit this fucking website,';
        var addrMessage = 'visit this fucking place,';

        var sentence = 'If you want to get to the bottom of this bullshit, ' +
            'you may want to ';

        var reasons = [];

        if(Object.getOwnPropertyNames(leoInfo).length > 0) {
            if(leoInfo.electionOfficials && leoInfo.electionOfficials.length > 0
                && leoInfo.electionOfficials[0].officePhoneNumber) {
                reasons.push(this.createMessageFragment(
                    phoneMessage,
                    leoInfo.electionOfficials[0].officePhoneNumber,
                    leoInfo.electionOfficials[0].officePhoneNumber,
                    'tel'
                ));
            }

            if(leoInfo.electionInfoUrl) {
                reasons.push(this.createMessageFragment(
                    urlMessage,
                    leoInfo.electionInfoUrl,
                    'Local Election Information',
                    'url'
                ));
            }

            if(leoInfo.physicalAddress) {
                var flattenedAddr = helpers.concatStreetAddress(
                    leoInfo.physicalAddress);

                reasons.push(this.createMessageFragment(
                    addrMessage,
                    encodeURIComponent(flattenedAddr),
                    flattenedAddr,
                    'addr'
                ));
            }
        }

        // we favor local election information first
        if(Object.getOwnPropertyNames(seoInfo).length > 0
            && Object.getOwnPropertyNames(leoInfo).length == 0) {
            if(seoInfo.electionOfficials && seoInfo.electionOfficials.length > 0
                && seoInfo.electionOfficials[0].officePhoneNumber
                && !leoPhone) {
                reasons.push(this.createMessageFragment(
                    phoneMessage,
                    seoInfo.electionOfficials[0].officePhoneNumber,
                    seoInfo.electionOfficials[0].officePhoneNumber,
                    'tel'
                ));
            }

            if(seoInfo.electionInfoUrl) {
                reasons.push(this.createMessageFragment(
                    urlMessage,
                    seoInfo.electionInfoUrl,
                    'State Election Information',
                    'url'
                ));
            }

            if(seoInfo.physicalAddress) {
                var flattenedAddr = helpers.concatStreetAddress(
                    seoInfo.physicalAddress);

                reasons.push(this.createMessageFragment(
                    addrMessage,
                    encodeURIComponent(flattenedAddr),
                    flattenedAddr,
                    'addr'
                ));
            }
        }

        return (
            <span className="txt">We couldn&apos;t find any fucking data. In the immortal words of The Great Bard, DJ Khaled, &quot;Congratulations! You played yourself.&quot;<br />
                {(() => {
                    if(reasons.length === 0) {
                        return (
                            <span className="txt">There are currently no elections associated with the fucking address you&apos;re trying to use. Get your shit together and try another one.</span>
                        )
                    } else if(reasons.length === 1) {
                        return (
                            <span className="txt">{sentence} {reasons[0]}.</span>
                        )
                    } else if(reasons.length === 2) {
                        return (
                            <span className="txt">{sentence} {reasons[0]}, or {reasons[1]}.</span>
                        )
                    } else if(reasons.length === 3) {
                        return (
                            <span className="txt">{sentence} {reasons[0]}, {reasons[1]}, or {reasons[2]}.</span>
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
