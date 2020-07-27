// Import dependencies
import React from 'react';

import helpers from 'helpers';

/**
 * Error Report Form Component
 *
 * @class ErrorReportForm
 * @extends React.Component
 */
class ErrorReportForm extends React.Component {
    /**
     * Event handler for click event
     *
     * @method onClickHandler
     * @return none
     */
    onClickHandler = (e) => {
        e.preventDefault();
        this.refs.errorFeedbackForm.submit();
    };

    /**
     * Renders error report form component
     *
     * @method render
     * @return {object} error reporting form component markup
     */
    render() {
        const normalizedAddress = this.props.normalizedAddress;
        const electionInfo = this.props.electionInfo;

        return (
            <div className="tabs-panel-errorLink">
                <button type="button" className="link" id="error-feedback-link" data-state={normalizedAddress.state} onClick={this.onClickHandler}>
                    This fucking thing wrong? <strong>Report it here.</strong>
                </button>
                <form className="hidden" style={{ display: 'none' }} method="post" action="https://voter-info-tool.appspot.com/feedback" ref="errorFeedbackForm" id="error-feedback-form">
                    <input type="hidden" defaultValue={electionInfo.id} name="electionId" />
                    <input type="hidden" defaultValue={helpers.concatStreetAddress(normalizedAddress)} name="address" />
                    <input type="submit" id="error-feedback-link-submit" value="" />
                </form>
            </div>
        );
    }
}

export default ErrorReportForm;
