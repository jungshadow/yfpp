// Import dependencies

import { format } from 'date-fns';
import helpers from 'helpers';

import './electionTitle.scss';

interface ElectionTitleProps {
    electionInfo: { electionDay?: string; name?: string };
}

const ElectionTitle = (props: ElectionTitleProps) => {
    const { electionDay, name } = props.electionInfo;
    const dateStr = electionDay ? format(new Date(electionDay + 'T00:00:00'), 'MMMM do, yyyy') : '';

    return (
        <div className="electionTitle">
            {dateStr && <div className="electionTitle__date">{dateStr}</div>}
            {/* TODO: When there's no election name, this just says "Fucking" via fucktify('').
               Revisit with a more helpful phrase — something that acknowledges the voter
               might actually have an election that the API doesn't cover yet. */}
            <h2 className="electionTitle__text">{helpers.fucktify(name || '')}</h2>
        </div>
    );
};

export default ElectionTitle;
