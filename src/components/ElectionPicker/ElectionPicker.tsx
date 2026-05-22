import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { navigateToResultsRoute } from 'helpers/getResultsRoute';
import { AppContext, DispatchContext } from 'appReducer';
import getLocations from 'requests/getLocations';
import type { ElectionInfo } from 'types/index';
import './electionPicker.scss';

function groupByDate(elections: ElectionInfo[]): Map<string, ElectionInfo[]> {
    const groups = new Map<string, ElectionInfo[]>();
    const sorted = [...elections].sort(
        (a, b) => new Date(a.electionDay).getTime() - new Date(b.electionDay).getTime(),
    );
    for (const election of sorted) {
        const day = election.electionDay;
        const group = groups.get(day) || [];
        group.push(election);
        groups.set(day, group);
    }
    return groups;
}

const ElectionPicker = () => {
    const navigate = useNavigate();
    const { pendingElections, relevantElections, searchQuery, electionInfo, representatives } =
        useContext(AppContext);
    const dispatch = useContext(DispatchContext);

    const elections = pendingElections || relevantElections;
    if (!elections || elections.length <= 1) return null;

    const handleSelect = async (election: ElectionInfo) => {
        const locations = await getLocations(searchQuery ?? '', election.id);
        if (locations?.error) {
            dispatch({
                type: 'SET_ERROR',
                error: { locations: locations.error as { message: string } },
            });
        } else if (locations) {
            dispatch({
                type: 'UPDATE_SEARCH_RESULTS',
                data: {
                    ...locations,
                    relevantElections: elections,
                    searchQuery: searchQuery ?? '',
                },
            });
            navigateToResultsRoute(navigate, {
                earlyVoteSites: locations.earlyVoteSites ?? [],
                pollingLocations: locations.pollingLocations ?? [],
                contests: locations.contests ?? [],
                dropOffLocations: locations.dropOffLocations ?? [],
                representatives,
            });
        }
    };

    const grouped = groupByDate(elections);
    const isPending = !!pendingElections;

    return (
        <div className={`electionPicker${!isPending ? ' electionPicker--inline' : ''}`}>
            <div className="electionPicker__heading">
                {isPending
                    ? 'You have multiple fucking elections coming up'
                    : 'Your upcoming fucking elections'}
            </div>
            {[...grouped.entries()].map(([day, dayElections]) => (
                <div key={day}>
                    <div className="electionPicker__date">
                        {format(new Date(day), 'MMMM do, yyyy')}
                    </div>
                    <ul className="electionPicker__list">
                        {dayElections.map(election => (
                            <li key={election.id} className="electionPicker__item">
                                <button
                                    type="button"
                                    className={`electionPicker__button${
                                        election.id === electionInfo.id
                                            ? ' electionPicker__button--active'
                                            : ''
                                    }`}
                                    onClick={() => handleSelect(election)}
                                >
                                    {election.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default ElectionPicker;
