import type { AppState, AppAction } from '../types';

export default function updateElectionResults(state: AppState, action: Extract<AppAction, { type: 'UPDATE_ELECTION_RESULTS' }>): AppState {
    const { elections = [] } = action;

    const filteredElections = elections.filter((election) => election.id !== '2000');

    return {
        ...state,
        elections: filteredElections,
    };
}
