import React from 'react';
import PropTypes from 'prop-types';
import './logo.scss';

const Logo = (props) => {
    return (
        <header role="banner">
            <h1 className="logo">
                <span className="logo_seg1">
                    Where's My <span className="logo__accent">Fucking</span>
                </span>{' '}
                <span className="logo__seg2">Polling Place?</span>
            </h1>
        </header>
    );
};

Logo.propTypes = {};

export default Logo;
