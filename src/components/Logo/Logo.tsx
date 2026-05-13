import React from 'react';
import classnames from 'classnames';
import './logo.scss';

interface LogoProps {
    isCompact?: boolean;
}

const Logo = ({isCompact}: LogoProps) => {
    const getLogoClassName = () => {
        return classnames({logo: true, 'logo--isCompact': isCompact});
    };

    return (
        <header role="banner">
            <h1 className={getLogoClassName()}>
                <span className="logo_seg1">
                    Where&apos;s My <span className="logo__accent">Fucking</span>
                </span>{' '}
                <span className="logo__seg2">Polling Place?</span>
            </h1>
        </header>
    );
};

export default Logo;
