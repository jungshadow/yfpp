import { initialState } from 'appReducer';
import type { ElectionInfo } from 'types/api';
import updateElectionResults from './updateElectionResults';

const texasPrimary: ElectionInfo = {
    id: '11098',
    name: 'Texas Democratic Primary',
    electionDay: '2026-05-26',
    ocdDivisionId: 'ocd-division/country:us/state:tx',
};

const generalElection: ElectionInfo = {
    id: '11300',
    name: 'General Election',
    electionDay: '2026-11-03',
    ocdDivisionId: 'ocd-division/country:us',
};

describe('updateElectionResults', () => {
    it('removes Google Civic test elections and keeps real elections in order', () => {
        const result = updateElectionResults(initialState, {
            type: 'UPDATE_ELECTION_RESULTS',
            elections: [
                {
                    id: '2000',
                    name: 'VIP Test Election',
                    electionDay: '2031-06-06',
                    ocdDivisionId: 'ocd-division/country:us',
                },
                texasPrimary,
                {
                    id: '1001',
                    name: 'Google Test Election (Future)',
                    electionDay: '2033-06-06',
                    ocdDivisionId: 'ocd-division/country:us',
                },
                generalElection,
            ],
        });

        expect(result.elections).toEqual([texasPrimary, generalElection]);
    });

    it('defaults missing elections to an empty list', () => {
        const result = updateElectionResults(
            { ...initialState, elections: [texasPrimary] },
            { type: 'UPDATE_ELECTION_RESULTS' },
        );

        expect(result.elections).toEqual([]);
    });
});
