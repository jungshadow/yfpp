import React from 'react';
import PropTypes from 'prop-types';
import Bios from 'components/Bios/Bios';

import './about.scss';
import Logo from 'components/Logo/Logo';

const About = (props) => {
    return (
        <div className="about">
            <div className="about__hd">
                <Logo isCompact />
            </div>
            <h1 className="about__title">About</h1>
            <div className="about__description">
                <div className="userContent userContent_reversedSoft">This shit was made by these motherfuckers.</div>
            </div>
            <div className="about__bios">
                <Bios />
            </div>
        </div>
    );
};

About.propTypes = {};

export default About;
