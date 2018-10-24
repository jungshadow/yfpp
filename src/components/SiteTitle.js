// Import dependencies
import React from 'react';
import PropTypes from 'prop-types';

/**
 * SiteTitle Component
 *
 * @class SiteTitle
 * @extends React.Component
 */
class SiteTitle extends React.Component {
    /**
     * Renders site title block
     *
     * @method render
     * @return {object} site title component markup
     */
    render() {
        return (
            <h1 className={'siteTitle ' + this.props.activeClassName}>
                <strong className="siteTitle-seg1">
                    Where&apos;s My <span className="mix-siteTitle_accent">Fucking</span>
                </strong>
                <strong className="siteTitle-seg2">Polling Place?</strong>
            </h1>
        );
    }
}

// set up propType validation
SiteTitle.propTypes = {
    activeClassName: PropTypes.string,
};

export default SiteTitle;
