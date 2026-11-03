import type { AppState, AppAction } from '../types';

// Google Civic API test datasets; their national ocdDivisionId matches every address.
const TEST_ELECTION_IDS = new Set(['2000', '1001']);

export default function updateElectionResults(
    state: AppState,
    action: Extract<AppAction, { type: 'UPDATE_ELECTION_RESULTS' }>,
): AppState {
    const { elections = [] } = action;

    const filteredElections = elections.filter(election => !TEST_ELECTION_IDS.has(election.id));

    return {
        ...state,
        elections: filteredElections,
    };
}
