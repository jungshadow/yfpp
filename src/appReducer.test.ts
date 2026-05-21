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
                offices: [
                    {
                        name: 'Governor',
                        divisionId: 'ocd-division/country:us/state:me',
                        officialIndices: [0],
                    },
                ],
            },
        });
        expect(result.representatives).toHaveLength(1);
        expect(result.representatives[0].name).toBe('Jane Doe');
        expect(result.offices).toHaveLength(1);
    });

    it('handles SET_PENDING_ELECTIONS', () => {
        const elections = [
            {
                id: '11098',
                name: 'Texas Democratic Primary',
                electionDay: '2026-05-26',
                ocdDivisionId: 'ocd-division/country:us/state:tx',
            },
            {
                id: '11256',
                name: 'Texas Republican Primary',
                electionDay: '2026-05-26',
                ocdDivisionId: 'ocd-division/country:us/state:tx',
            },
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
                {
                    id: '11098',
                    name: 'Texas Democratic Primary',
                    electionDay: '2026-05-26',
                    ocdDivisionId: 'ocd-division/country:us/state:tx',
                },
            ],
            isActive: true,
        };
        const result = appReducer(stateWithPending, {
            type: 'UPDATE_SEARCH_RESULTS',
            data: {
                normalizedInput: {
                    line1: '123 Main St',
                    line2: '',
                    city: 'Austin',
                    state: 'TX',
                    zip: '78701',
                },
                election: {
                    id: '11098',
                    name: 'Texas Democratic Primary',
                    electionDay: '2026-05-26',
                },
                pollingLocations: [],
                searchQuery: '123 Main St, Austin, TX',
            },
        });
        expect(result.pendingElections).toBeUndefined();
        expect(result.electionInfo.id).toBe('11098');
    });

    it('handles RESET_SEARCH: clears stale data but preserves elections and searchToggleIsOpen', () => {
        const stateWithData = {
            ...initialState,
            elections: [
                {
                    id: '11098',
                    name: 'Texas Democratic Primary',
                    electionDay: '2026-05-26',
                    ocdDivisionId: 'ocd-division/country:us/state:tx',
                },
            ],
            electionInfo: {
                id: '11098',
                name: 'Texas Democratic Primary',
                electionDay: '2026-05-26',
            },
            relevantElections: [
                {
                    id: '11098',
                    name: 'Texas Democratic Primary',
                    electionDay: '2026-05-26',
                    ocdDivisionId: 'ocd-division/country:us/state:tx',
                },
            ],
            representatives: [{ name: 'Jane Doe', party: 'Independent' }],
            offices: [
                {
                    name: 'Governor',
                    divisionId: 'ocd-division/country:us/state:tx',
                    officialIndices: [0],
                },
            ],
            pollingLocations: [
                {
                    address: {
                        line1: '100 Main St',
                        city: 'Austin',
                        state: 'TX',
                        zip: '78701',
                    },
                },
            ],
            contests: [{ type: 'General', office: 'US Senate' }],
            leoInfo: { name: 'Travis County Elections' },
            seoInfo: { name: 'Texas Secretary of State' },
            normalizedAddress: {
                line1: '123 Main St',
                city: 'Austin',
                state: 'TX',
                zip: '78701',
            },
            searchQuery: '123 Main St, Austin, TX',
            searchToggleIsOpen: false,
            isActive: true,
            errors: { locations: { message: 'Some error' } },
        };

        const result = appReducer(stateWithData, {
            type: 'RESET_SEARCH',
            searchQuery: '456 Elm St, Baltimore, MD 21201',
        });

        // Preserved
        expect(result.elections).toEqual(stateWithData.elections);
        expect(result.searchToggleIsOpen).toBe(false);
        expect(result.isActive).toBe(true);
        expect(result.searchQuery).toBe('456 Elm St, Baltimore, MD 21201');

        // Cleared
        expect(result.electionInfo).toEqual({});
        expect(result.relevantElections).toBeUndefined();
        expect(result.pendingElections).toBeUndefined();
        expect(result.representatives).toEqual([]);
        expect(result.offices).toEqual([]);
        expect(result.pollingLocations).toEqual([]);
        expect(result.earlyVoteSites).toEqual([]);
        expect(result.dropOffLocations).toEqual([]);
        expect(result.contests).toEqual([]);
        expect(result.leoInfo).toEqual({});
        expect(result.seoInfo).toEqual({});
        expect(result.normalizedAddress).toEqual({});
        expect(result.errors).toBe(false);
        expect(result.primaryParties).toEqual([]);
        expect(result.isSearching).toBe(true);
    });

    it('handles RESET_SEARCH followed by SEARCH_COMPLETE: sets isSearching false', () => {
        const resetState = appReducer(initialState, {
            type: 'RESET_SEARCH',
            searchQuery: '123 Main St, Austin, TX',
        });
        expect(resetState.isSearching).toBe(true);

        const result = appReducer(resetState, { type: 'SEARCH_COMPLETE' });
        expect(result.isSearching).toBe(false);
    });

    it('handles SEARCH_COMPLETE: is a no-op when not searching', () => {
        const result = appReducer(initialState, { type: 'SEARCH_COMPLETE' });
        expect(result.isSearching).toBe(false);
    });
});
