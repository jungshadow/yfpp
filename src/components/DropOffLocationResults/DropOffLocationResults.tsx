import Pager from 'components/Pager/Pager';
import LocationCard from 'components/LocationCard/LocationCard';
import FallbackMessage from 'components/FallbackMessage/FallbackMessage';

import type { PollingLocation } from 'types/index';

interface DropOffLocationResultsProps {
    locations: PollingLocation[];
}

const DropOffLocationResults = ({ locations, ...additionalProps }: DropOffLocationResultsProps) => {
    if (!locations.length) {
        return <FallbackMessage message="No fucking drop off results for that address" />;
    }
    return (
        <Pager data={locations} {...additionalProps}>
            <LocationCard locationType="drop-off" />
        </Pager>
    );
};

export default DropOffLocationResults;
