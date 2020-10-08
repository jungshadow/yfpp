import React, { useContext } from 'react';
import { AppContext } from 'appReducer';
import { NavLink } from 'react-router-dom';

import './mainNav.scss';
import { BallotIcon, DropBoxIcon, MapIcon, RepresentativesIcon } from 'components/Icons';

const MainNav = () => {
    const { dropOffLocations, earlyVoteSites, pollingLocations, primaryParties, contests, representatives } = useContext(AppContext);

    return (
        <nav className="mainNav">
            <ul className="mainNav__list">
                {(earlyVoteSites.length > 0 || pollingLocations.length > 0) && (
                    <li className="mainNav__listItem">
                        <NavLink className="mainNav__listItemLink" to="/polling-place" activeClassName="mainNav__listItemLink--isActive">
                            <span className="mainNav__listItemIcon">
                                <MapIcon />
                            </span>
                            <span className="mainNav__listItemText">Polling Place</span>
                        </NavLink>
                    </li>
                )}
                {(primaryParties.length > 0 || contests.length > 0) && (
                    <li className="mainNav__listItem">
                        <NavLink className="mainNav__listItemLink" to={{ pathname: '/ballot', search: window.location.search }} activeClassName="mainNav__listItemLink--isActive">
                            <span className="mainNav__listItemIcon">
                                <BallotIcon />
                            </span>
                            <span className="mainNav__listItemText">Ballot</span>
                        </NavLink>
                    </li>
                )}
                {representatives.length > 0 && (
                    <li className="mainNav__listItem">
                        <NavLink className="mainNav__listItemLink" to="/representatives" activeClassName="mainNav__listItemLink--isActive">
                            <div className="mainNav__listItemIcon">
                                <RepresentativesIcon />
                            </div>
                            <span className="mainNav__listItemText">Representatives</span>
                        </NavLink>
                    </li>
                )}
                {dropOffLocations.length > 0 && (
                    <li className="mainNav__listItem">
                        <NavLink className="mainNav__listItemLink" to="/drop-off-sites" activeClassName="mainNav__listItemLink--isActive">
                            <div className="mainNav__listItemIcon">
                                <DropBoxIcon />
                            </div>
                            <span className="mainNav__listItemText">Drop Off Sites</span>
                        </NavLink>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default MainNav;
