import React from 'react';

import Representative from 'components/representatives/Representative';
import helpers from 'helpers';

const Representatives = (props) => {
    const { representatives, offices } = props;

    function buildRepresentativesList(offices, representatives) {
        const transformedReps = offices.reduce((acc, currentValue) => {
            const officialIndices = currentValue.officialIndices;

            officialIndices.forEach((index) => {
                const transformedRep = { ...representatives[index], office: currentValue.name };
                acc.push(transformedRep);
            });
            return acc;
        }, []);
        return transformedReps;
    }

    return (
        <ul className="vList">
            {buildRepresentativesList(offices, representatives).map((rep) => (
                <Representative key={`rep_${helpers.slugify(rep.name)}`} details={rep} />
            ))}
        </ul>
    );
};

Representatives.propTypes = {};

export default Representatives;
