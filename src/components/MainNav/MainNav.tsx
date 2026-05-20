import React, { useContext } from 'react';
import { AppContext } from 'appReducer';
import { NavLink } from 'react-router-dom';

import './mainNav.scss';
import { BallotIcon, DropBoxIcon, MapIcon, RepresentativesIcon } from 'components/Icons';

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `mainNav__listItemLink${isActive ? ' mainNav__listItemLink--isActive' : ''}`;

const MainNav = () => {
    const {
        dropOffLocations,
        earlyVoteSites,
        pollingLocations,
        primaryParties,
        contests,
        representatives,
    } = useContext(AppContext);

    return (
        <nav className="mainNav">
            <ul className="mainNav__list">
                {(earlyVoteSites.length > 0 || pollingLocations.length > 0) && (
                    <li className="mainNav__listItem">
                        <NavLink className={getNavLinkClass} to="/polling-place">
                            <span className="mainNav__listItemIcon">
                                <MapIcon />
                            </span>
                            <span className="mainNav__listItemText">Polling Place</span>
                        </NavLink>
                    </li>
                )}
                {(primaryParties.length > 0 || contests.length > 0) && (
                    <li className="mainNav__listItem">
                        <NavLink
                            className={getNavLinkClass}
                            to={{ pathname: '/ballot', search: window.location.search }}
                        >
                            <span className="mainNav__listItemIcon">
                                <BallotIcon />
                            </span>
                            <span className="mainNav__listItemText">Ballot</span>
                        </NavLink>
                    </li>
                )}
                {representatives.length > 0 && (
                    <li className="mainNav__listItem">
                        <NavLink className={getNavLinkClass} to="/representatives">
                            <div className="mainNav__listItemIcon">
                                <RepresentativesIcon />
                            </div>
                            <span className="mainNav__listItemText">Representatives</span>
                        </NavLink>
                    </li>
                )}
                {dropOffLocations.length > 0 && (
                    <li className="mainNav__listItem">
                        <NavLink className={getNavLinkClass} to="/drop-off-sites">
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
