import React, { useContext } from 'react';
import { AppContext } from 'appReducer';
import { NavLink } from 'react-router-dom';

import './mainNav.scss';

const MainNav = () => {
    const { earlyVoteSites, pollingLocations, primaryParties, contests, representatives } = useContext(AppContext);

    return (
        <nav className="mainNav">
            <ul className="mainNav__list">
                {(earlyVoteSites.length > 0 || pollingLocations.length > 0) && (
                    <li className="mainNav__listItem">
                        <NavLink className="mainNav__listItemLink" to="/polling-place" activeClassName="mainNav__listItemLink--isActive">
                            Polling Place
                        </NavLink>
                    </li>
                )}
                {(primaryParties.length > 0 || contests.length > 0) && (
                    <li className="mainNav__listItem">
                        <NavLink className="mainNav__listItemLink" to={{ pathname: '/ballot', search: window.location.search }} activeClassName="mainNav__listItemLink--isActive">
                            Ballot
                        </NavLink>
                    </li>
                )}
                {representatives.length > 0 && (
                    <li className="mainNav__listItem">
                        <NavLink className="mainNav__listItemLink" to="/representatives" activeClassName="mainNav__listItemLink--isActive">
                            Representatives
                        </NavLink>
                    </li>
                )}
                <li className="mainNav__listItem">
                    <NavLink className="mainNav__listItemLink" to="/drop-off-sites" activeClassName="mainNav__listItemLink--isActive">
                        Drop Off Sites
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default MainNav;
