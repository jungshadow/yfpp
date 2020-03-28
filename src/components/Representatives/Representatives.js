import React from 'react';
import PropTypes from 'prop-types';
import Representative from './Representative';
import helpers from '../../helpers';

const Representatives = props => {
    const { representatives, offices } = props;
    console.log({ offices });

    function buildRepresentativesList(offices, representatives) {
        const transformedReps = offices.reduce((acc, currentValue) => {
            const officialIndices = currentValue.officialIndices;

            officialIndices.forEach(index => {
                const transformedRep = { ...representatives[index], office: currentValue.name };
                acc.push(transformedRep);
            });
            return acc;
        }, []);
        return transformedReps;
    }

    console.log();

    return (
        <ul className="vList vList_divided">
            {buildRepresentativesList(offices, representatives).map(rep => (
                <Representative key={`rep_${helpers.slugify(rep.name)}`} details={rep} />
            ))}
        </ul>
    );
};

Representatives.propTypes = {};

export default Representatives;
