import Pager from 'components/Pager/Pager';
import LocationCard from 'components/LocationCard/LocationCard';
import FallbackMessage from 'components/FallbackMessage/FallbackMessage';

import type { PollingLocation } from 'types/index';

interface EarlyVoteResultsProps {
    locations: PollingLocation[];
}

const EarlyVoteResults = ({ locations }: EarlyVoteResultsProps) => {
    if (!locations.length) {
        return <FallbackMessage message="No fucking early voting results for that address" />;
    }
    return (
        <Pager data={locations} numberPerPage={5}>
            <LocationCard locationType="early-vote" />
        </Pager>
    );
};

export default EarlyVoteResults;
