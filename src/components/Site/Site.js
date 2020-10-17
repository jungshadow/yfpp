import React, {useContext, useEffect} from 'react';
import classnames from 'classnames';

import Search from 'components/Search/Search';
import Logo from 'components/Logo/Logo';
import {AppContext, DispatchContext} from 'appReducer';
import './site.scss';
import Results from 'components/Results';
import Secondary from 'components/Secondary/Secondary';
import useWindowSize from 'hooks/useWindowSize';
import useElections from 'hooks/useElections';
import sticker from 'images/iFuckingVotedSticker.png';
import SupplementalLinks from 'components/SupplementalLinks/SupplementalLinks';

const Site = () => {
    const dispatch = useContext(DispatchContext);
    useElections(dispatch);

    const {isActive} = useContext(AppContext);
    const windowSize = useWindowSize();

    useEffect(() => {
        dispatch({
            type: 'SET_SEARCH_TOGGLE_STATUS',
            status: windowSize.width > 768
        });
    }, [windowSize, dispatch]);

    const getSiteClassName = () => {
        return classnames({
            site: true,
            'site--hasSearchVal': isActive,
            'site--isMobile': windowSize.width < 768
        });
    };

    const ref = React.createRef();

    return (
        <div className={getSiteClassName()} ref={ref}>
            <div className="site__hd">
                <div className="site__graphic">
                    <img src={sticker} alt="I fucking voted today sticker" />
                </div>
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
                        <Secondary getRef={() => ref} />
                    </div>
                    <div className="site__content">
                        <div className="site__contentInner">
                            <Results />
                        </div>
                    </div>
                </div>
            )}
            <div className="site__ft">
                <SupplementalLinks searchIsActive={isActive} />
            </div>
        </div>
    );
};

export default Site;
