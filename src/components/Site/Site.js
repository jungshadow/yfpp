import React, { useContext } from 'react';
import classnames from 'classnames';
import Search from 'components/Search/Search';
import Logo from 'components/Logo/Logo';
import { AppContext } from 'appReducer';
import './site.scss';
import Results from 'components/Results';
import Secondary from 'components/Secondary/Secondary';

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
            {isActive && (
                <div className="site__bd">
                    <div className="site__secondary">
                        <Secondary />
                    </div>
                    <div className="site__content">
                        <Results />
                    </div>
                </div>
            )}
            <div className="site__ft"></div>
        </div>
    );
};

export default Site;
