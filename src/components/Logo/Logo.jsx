import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './logo.scss';

const Logo = ({isCompact}) => {
    const getLogoClassName = () => {
        return classnames({logo: true, 'logo--isCompact': isCompact});
    };

    return (
        <header role="banner">
            <h1 className={getLogoClassName()}>
                <span className="logo_seg1">
                    Where's My <span className="logo__accent">Fucking</span>
                </span>{' '}
                <span className="logo__seg2">Polling Place?</span>
            </h1>
        </header>
    );
};

Logo.propTypes = {isCompact: PropTypes.bool};

export default Logo;
