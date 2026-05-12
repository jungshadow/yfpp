import React from 'react';
import helpers from '../helpers';

interface ErrorMessageProps {
    leoInfo: Record<string, unknown>;
    leoPhone?: string;
    seoInfo: Record<string, unknown>;
    errorHandlerRemover: () => void;
}

class ErrorMessage extends React.Component<ErrorMessageProps> {
    /**
     * Renders error messages based on available info
     *
     * @method given a message, href, anchorText, and messageType
     *     {'tel', 'url', 'addr'}, this method will create an HTML fragment
     * @return {object} returns error message based on available info
     */
    createMessageFragment(message: string, href: string, anchorText: string, messageType: string) {
        let ElementFrag: React.ReactNode = '';

        switch (messageType) {
            case 'tel':
                ElementFrag = (
                    <span>
                        {message} <a href={'tel:' + href}>{anchorText}</a>
                    </span>
                );
                break;
            case 'url':
                ElementFrag = (
                    <span>
                        {message} <a href={href}>{anchorText}</a>
                    </span>
                );
                break;
            case 'addr':
                const url = 'https://maps.google.com/?q=' + href;
                ElementFrag = (
                    <span>
                        {message} <a href={url}>{anchorText}</a>
                    </span>
                );
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
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const leoInfo = this.props.leoInfo as any;
        const leoPhone = this.props.leoPhone;
        const seoInfo = this.props.seoInfo as any;

        var phoneMessage = 'call this fucking number,';
        var urlMessage = 'visit this fucking website,';
        var addrMessage = 'visit this fucking place,';

        var sentence = `If you want to get to the bottom of this bullshit, you may want to `;

        var reasons: React.ReactNode[] = [];

        if (Object.getOwnPropertyNames(leoInfo).length > 0) {
            if (leoInfo.electionOfficials && leoInfo.electionOfficials.length > 0 && leoInfo.electionOfficials[0].officePhoneNumber) {
                reasons.push(this.createMessageFragment(phoneMessage, leoInfo.electionOfficials[0].officePhoneNumber, leoInfo.electionOfficials[0].officePhoneNumber, 'tel'));
            }

            if (leoInfo.electionInfoUrl) {
                reasons.push(this.createMessageFragment(urlMessage, leoInfo.electionInfoUrl, 'Local Election Information', 'url'));
            }

            if (leoInfo.physicalAddress) {
                const flattenedAddr = helpers.concatStreetAddress(leoInfo.physicalAddress);

                reasons.push(this.createMessageFragment(addrMessage, encodeURIComponent(flattenedAddr), flattenedAddr, 'addr'));
            }
        }

        // we favor local election information first
        if (Object.getOwnPropertyNames(seoInfo).length > 0 && Object.getOwnPropertyNames(leoInfo).length === 0) {
            if (seoInfo.electionOfficials && seoInfo.electionOfficials.length > 0 && seoInfo.electionOfficials[0].officePhoneNumber && !leoPhone) {
                reasons.push(this.createMessageFragment(phoneMessage, seoInfo.electionOfficials[0].officePhoneNumber, seoInfo.electionOfficials[0].officePhoneNumber, 'tel'));
            }

            if (seoInfo.electionInfoUrl) {
                reasons.push(this.createMessageFragment(urlMessage, seoInfo.electionInfoUrl, 'State Election Information', 'url'));
            }

            if (seoInfo.physicalAddress) {
                const flattenedAddr = helpers.concatStreetAddress(seoInfo.physicalAddress);

                reasons.push(this.createMessageFragment(addrMessage, encodeURIComponent(flattenedAddr), flattenedAddr, 'addr'));
            }
        }

        return (
            <div className="userContent userContent_reversed">
                <p>
                    We couldn&apos;t find any fucking data. In the immortal words of The Great Bard, DJ Khaled, <em>&quot;Congratulations! You played yourself.&quot;</em>
                </p>
                {(() => {
                    if (reasons.length === 0) {
                        return (
                            <p>
                                There are currently no elections associated with the fucking address you&apos;re trying to use.{' '}
                                <a href="https://www.fvap.gov/search-offices">Look up your local election official</a> and find out if you're fucking voting.
                            </p>
                        );
                    } else if (reasons.length === 1) {
                        return (
                            <p>
                                {sentence} {reasons[0]}.
                            </p>
                        );
                    } else if (reasons.length === 2) {
                        return (
                            <p>
                                {sentence} {reasons[0]}, or {reasons[1]}.
                            </p>
                        );
                    } else if (reasons.length === 3) {
                        return (
                            <p>
                                {sentence} {reasons[0]}, {reasons[1]}, or {reasons[2]}.
                            </p>
                        );
                    }
                })()}
            </div>
        );
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
                <span className="card-btn">
                    <button className="iconBtn" onClick={this.props.errorHandlerRemover}>
                        <span className="iconBtn-txt">Close</span>
                        <span className="iconBtn-icon">
                            <i className="icon icon_close mix-icon_light" />
                        </span>
                    </button>
                </span>
                <div className="card-bd">
                    <h3 className="hdg hdg_1 mix-hdg_headline">For Fuck&apos;s Sake</h3>
                    <div>{this.renderMessage()}</div>
                </div>
            </div>
        );
    }
}

export default ErrorMessage;
