// Import dependencies
import React from 'react';
import PropTypes from 'prop-types';

import ErrorReportForm from './ErrorReportForm';

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
        );
    }
}

// set up propType validation
TabPanel.propTypes = {
    electionInfo: PropTypes.object,
    label: PropTypes.string,
    normalizedAddress: PropTypes.object,
};

export default TabPanel;
