import React from 'react';

import classnames from 'classnames';
import { Link } from 'react-router-dom';

import './iconLink.scss';

interface IconLinkProps {
    to?: string;
    icon?: React.ReactNode;
    label?: string;
    iconPosition?: string;
    size?: string;
    color?: string;
    href?: string;
    isStacked?: boolean;
    children?: React.ReactNode;
    [key: string]: unknown;
}

const IconLink = ({
    to,
    icon,
    label,
    iconPosition = 'after',
    size,
    color,
    href,
    isStacked,
    children: _children,
    ...additionalProps
}: IconLinkProps) => {
    const getIconClassName = () => {
        return classnames({
            iconLink: true,
            [`iconLink--${iconPosition}`]: true,
            'iconLink--isStacked': isStacked,
            [`iconLink--${size}`]: size,
            [`iconLink--${color}`]: color,
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
        <Link className={getIconClassName()} to={to || '#'} {...additionalProps}>
            {iconPosition === 'after' && label}
            <span className="iconLink__icon">{icon}</span>
            {iconPosition === 'before' && label}
        </Link>
    );
};

export default IconLink;
