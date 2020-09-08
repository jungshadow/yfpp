import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { AppContext } from 'appReducer';
import MainNav from 'components/MainNav/MainNav';
import ElectionTitle from 'components/ElectionTitle/ElectionTitle';

import './secondary.scss';

const Secondary = (props) => {
    const { electionInfo } = useContext(AppContext);

    return (
        <div className="secondary">
            <div className="secondary__heading">
                <ElectionTitle electionInfo={electionInfo} />
            </div>
            <div className="secondary__nav">
                <MainNav />
            </div>
        </div>
    );
};

Secondary.propTypes = {};

export default Secondary;
