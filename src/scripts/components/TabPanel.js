// Import dependencies
import React from 'react';
import ReactDOM from 'react-dom';

import ErrorReportForm from './ErrorReportForm'

/**
 * TabPanel Component
 *
 * @class TabPanel
 * @extends React.Component
 */
class TabPanel extends React.Component {

    /**
     * Renders Tab Panel component
     *
     * @method render
     * @return {object} TabPanel component markup
     */
    render() {

        return (
            <div>
                <ErrorReportForm normalizedAddress={this.props.normalizedAddress} electionInfo={this.props.electionInfo} />
                {this.props.children}
            </div>
        )
    }

};

export default TabPanel;
