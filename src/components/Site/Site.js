import React from 'react';
import Search from 'components/Search/Search';
import './site.scss';
import Logo from 'components/Logo/Logo';

const Site = () => {
    return (
        <div className="site">
            <div className="site__hd"></div>
            <div className="site__bd">
                <div className="site__logo">
                    <Logo />
                </div>
                <div className="site__search">
                    <Search />
                </div>
            </div>
            <div className="site__ft"></div>
        </div>
    );
};

export default Site;
