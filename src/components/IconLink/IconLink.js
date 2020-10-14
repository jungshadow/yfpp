import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import {Link} from 'react-router-dom';

import './iconLink.scss';

const IconLink = ({to, icon, label, iconPosition, size, color, href, isStacked, ...additionalProps}) => {
    const getIconClassName = () => {
        return classnames({
            iconLink: true,
            [`iconLink--${iconPosition}`]: true,
            'iconLink--isStacked': isStacked,
            [`iconLink--${size}`]: size,
            [`iconLink--${color}`]: color
        });
    };

    if (href) {
        return (
            <a
                className={getIconClassName()}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                {...additionalProps}
            >
                {iconPosition === 'after' && label}
                <span className="iconLink__icon">{icon}</span>
                {iconPosition === 'before' && label}
            </a>
        );
    }
    return (
        <Link className={getIconClassName()} to={to} {...additionalProps}>
            {iconPosition === 'after' && label}
            <span className="iconLink__icon">{icon}</span>
            {iconPosition === 'before' && label}
        </Link>
    );
};

IconLink.propTypes = {
    to: PropTypes.string,
    icon: PropTypes.node,
    label: PropTypes.string,
    iconPosition: PropTypes.string,
    isStacked: PropTypes.bool
};

IconLink.defaultProps = {
    iconPosition: 'after'
};

export default IconLink;
