export default function updateElectionResults(state, action) {
    const { elections } = action;

    const filteredElections = elections.filter((election) => election.id !== '2000');

    return {
        ...state,
        elections: filteredElections,
    };
}
