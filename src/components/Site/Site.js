import React, { useContext, useEffect } from 'react';
import classnames from 'classnames';
import Search from 'components/Search/Search';
import Logo from 'components/Logo/Logo';
import { AppContext, DispatchContext } from 'appReducer';
import './site.scss';
import Results from 'components/Results';
import Secondary from 'components/Secondary/Secondary';
import useWindowSize from 'hooks/useWindowSize';

const Site = () => {
    const { isActive } = useContext(AppContext);
    const dispatch = useContext(DispatchContext);
    const windowSize = useWindowSize();
    useEffect(() => {
        dispatch({ type: 'SET_SEARCH_TOGGLE_STATUS', status: windowSize.width > 768 });
    }, [windowSize, dispatch]);

    const getSiteClassName = () => {
        return classnames({
            site: true,
            'site--hasSearchVal': isActive,
            'site--isMobile': windowSize.width < 768,
        });
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
