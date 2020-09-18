import React from 'react';
import PropTypes from 'prop-types';

import './locationActions.scss';
import { FacebookIcon, MapIcon } from 'components/Icons';
import TwitterIcon from 'components/Icons/TwitterIcon';

const LocationActions = (props) => {
    return (
        <div className="locationActions">
            <button className="locationActions__btn locationActions__btn--mapBtn" type="button">
                Map It
                <i className="locationActions__btnIcon">
                    <MapIcon />
                </i>
            </button>
            <button className="locationActions__btn locationActions__btn--facebookBtn" type="button">
                Share
                <i className="locationActions__btnIcon">
                    <FacebookIcon />
                </i>
            </button>
            <button className="locationActions__btn locationActions__btn--twitterBtn" type="button">
                Share
                <i className="locationActions__btnIcon">
                    <TwitterIcon />
                </i>
            </button>
        </div>
    );
};

LocationActions.propTypes = {};

export default LocationActions;
