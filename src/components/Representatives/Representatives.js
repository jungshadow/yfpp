import React from 'react';
import PropTypes from 'prop-types';
import Representative from './Representative';
import helpers from '../../helpers';

const Representatives = props => {
    const { representatives } = props;
    return (
        <ul className="vList vList_divided">
            {representatives.map(rep => (
                <Representative key={`rep_${helpers.slugify(rep.name)}`} details={rep} />
            ))}
        </ul>
    );
};

Representatives.propTypes = {};

export default Representatives;
