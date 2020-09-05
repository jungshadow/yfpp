import React, { useContext } from 'react';
import classnames from 'classnames';
import Search from 'components/Search/Search';
import Logo from 'components/Logo/Logo';
import { AppContext } from 'appReducer';
import './site.scss';

const Site = () => {
    const { isActive } = useContext(AppContext);

    const getSiteClassName = () => {
        return classnames({ site: true, 'site--hasSearchVal': isActive });
    };

    return (
        <div className={getSiteClassName()}>
            <div className="site__hd">
                <div className="site__logo">
                    <Logo isCompact={isActive} />
                </div>
                <div className="site__search">
                    <Search />
                </div>
            </div>
            <div className="site__bd"></div>
            <div className="site__ft"></div>
        </div>
    );
};

export default Site;
