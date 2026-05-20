import RepresentativeCard from 'components/Representatives/RepresentativeCard';
import FallbackMessage from 'components/FallbackMessage/FallbackMessage';
import Pager from 'components/Pager/Pager';
import type { Official, Office } from 'types/index';

interface RepresentativesProps {
    representatives: Official[];
    offices: Office[];
}

const Representatives = (props: RepresentativesProps) => {
    const { representatives, offices } = props;

    function buildRepresentativesList(offices: Office[], representatives: Official[]) {
        const transformedReps = offices.reduce(
            (acc: Array<Official & { office: string }>, currentValue) => {
                const officialIndices = currentValue.officialIndices;

                officialIndices.forEach((index: number) => {
                    const transformedRep = {
                        ...representatives[index],
                        office: currentValue.name,
                    };
                    acc.push(transformedRep);
                });
                return acc;
            },
            [],
        );
        return transformedReps;
    }

    if (!representatives.length) {
        return <FallbackMessage message="No fucking representatives results for that address" />;
    }
    const reps = buildRepresentativesList(offices, representatives);

    return (
        <Pager data={reps}>
            <RepresentativeCard />
        </Pager>
    );
};

Representatives.propTypes = {} as Record<string, never>;

export default Representatives;
