import React from 'react';
import { NavLink } from 'react-router-dom';

import './mainNav.scss';

const MainNav = () => {
    return (
        <nav className="mainNav">
            <ul className="mainNav__list">
                <li className="mainNav__listItem">
                    <NavLink className="mainNav__listItemLink" to="/polling-place" activeClassName="mainNav__listItemLink--isActive">
                        Polling Place
                    </NavLink>
                </li>
                <li className="mainNav__listItem">
                    <NavLink className="mainNav__listItemLink" to={{ pathname: '/ballot', search: window.location.search }} activeClassName="mainNav__listItemLink--isActive">
                        Ballot
                    </NavLink>
                </li>
                <li className="mainNav__listItem">
                    <NavLink className="mainNav__listItemLink" to="/representatives" activeClassName="mainNav__listItemLink--isActive">
                        Representatives
                    </NavLink>
                </li>
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
