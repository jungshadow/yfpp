import React from 'react';

import RepresentativeCard from 'components/Representatives/RepresentativeCard';
import FallbackMessage from 'components/FallbackMessage/FallbackMessage';
import Pager from 'components/Pager/Pager';

const Representatives = (props) => {
    const {representatives, offices} = props;

    function buildRepresentativesList(offices, representatives) {
        const transformedReps = offices.reduce((acc, currentValue) => {
            const officialIndices = currentValue.officialIndices;

            officialIndices.forEach((index) => {
                const transformedRep = {
                    ...representatives[index],
                    office: currentValue.name
                };
                acc.push(transformedRep);
            });
            return acc;
        }, []);
        return transformedReps;
    }

    if (!representatives.length) {
        return (
            <FallbackMessage message="No fucking representatives results for that address" />
        );
    }
    const reps = buildRepresentativesList(offices, representatives);
    return (
        <Pager data={reps}>
            <RepresentativeCard />
        </Pager>
    );
};

Representatives.propTypes = {};

export default Representatives;
