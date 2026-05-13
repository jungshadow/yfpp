import { appReducer, initialState } from './appReducer';

describe('appReducer', () => {
    it('returns initial state for unknown action', () => {
        // @ts-expect-error testing unknown action type
        const result = appReducer(initialState, { type: 'UNKNOWN' });
        expect(result).toBe(initialState);
    });

    it('handles SET_SEARCH_TOGGLE_STATUS', () => {
        const result = appReducer(initialState, {
            type: 'SET_SEARCH_TOGGLE_STATUS',
            status: false,
        });
        expect(result.searchToggleIsOpen).toBe(false);
    });

    it('handles SET_ERROR', () => {
        const result = appReducer(initialState, {
            type: 'SET_ERROR',
            error: { locations: { message: 'Not found' } },
        });
        expect(result.errors).toEqual({ locations: { message: 'Not found' } });
    });

    it('handles SET_ERROR with false to clear errors', () => {
        const stateWithError = {
            ...initialState,
            errors: { locations: { message: 'Bad' } } as const,
        };
        const result = appReducer(stateWithError, {
            type: 'SET_ERROR',
            error: false,
        });
        expect(result.errors).toBe(false);
    });

    it('handles UPDATE_REPRESENTATIVES_RESULTS', () => {
        const result = appReducer(initialState, {
            type: 'UPDATE_REPRESENTATIVES_RESULTS',
            data: {
                officials: [
                    {
                        name: 'Jane Doe',
                        party: 'Independent',
                        phones: ['555-1234'],
                        urls: [],
                        photoUrl: '',
                        channels: [],
                        address: [],
                    },
                ],
                offices: [{ name: 'Governor', divisionId: 'ocd-division/country:us/state:me', officialIndices: [0] }],
            },
        });
        expect(result.representatives).toHaveLength(1);
        expect(result.representatives[0].name).toBe('Jane Doe');
        expect(result.offices).toHaveLength(1);
    });

    it('handles SET_PENDING_ELECTIONS', () => {
        const elections = [
            { id: '11098', name: 'Texas Democratic Primary', electionDay: '2026-05-26', ocdDivisionId: 'ocd-division/country:us/state:tx' },
            { id: '11256', name: 'Texas Republican Primary', electionDay: '2026-05-26', ocdDivisionId: 'ocd-division/country:us/state:tx' },
        ];
        const result = appReducer(initialState, {
            type: 'SET_PENDING_ELECTIONS',
            elections,
            searchQuery: '123 Main St, Austin, TX',
        });
        expect(result.pendingElections).toEqual(elections);
        expect(result.searchQuery).toBe('123 Main St, Austin, TX');
        expect(result.isActive).toBe(true);
    });

    it('clears pendingElections on SET_PENDING_ELECTIONS followed by UPDATE_SEARCH_RESULTS', () => {
        const stateWithPending = {
            ...initialState,
            pendingElections: [
                { id: '11098', name: 'Texas Democratic Primary', electionDay: '2026-05-26', ocdDivisionId: 'ocd-division/country:us/state:tx' },
            ],
            isActive: true,
        };
        const result = appReducer(stateWithPending, {
            type: 'UPDATE_SEARCH_RESULTS',
            data: {
                normalizedInput: { line1: '123 Main St', line2: '', city: 'Austin', state: 'TX', zip: '78701' },
                election: { id: '11098', name: 'Texas Democratic Primary', electionDay: '2026-05-26' },
                pollingLocations: [],
                searchQuery: '123 Main St, Austin, TX',
            },
        });
        expect(result.pendingElections).toBeUndefined();
        expect(result.electionInfo.id).toBe('11098');
    });
});
