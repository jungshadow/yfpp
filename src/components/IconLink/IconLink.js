import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import './iconLink.scss';

const IconLink = ({to, icon, label, iconPosition, ...additionalProps}) => {
    return (
        <Link
            className={`iconLink iconLink__${iconPosition}`}
            to={to}
            {...additionalProps}
        >
            {iconPosition === 'right' && label}
            <span className="iconLink__icon">{icon}</span>
            {iconPosition === 'left' && label}
        </Link>
    );
};

IconLink.propTypes = {
    to: PropTypes.string,
    icon: PropTypes.node,
    label: PropTypes.string,
    iconPosition: PropTypes.string
};

IconLink.defaultProps = {
    iconPosition: 'right'
};

export default IconLink;
