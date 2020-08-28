import React from 'react';
import updateSearchResults from 'actions/updateSearchResults';

export const AppContext = React.createContext();
export const DispatchContext = React.createContext();

export function appReducer(state, action) {
    switch (action.type) {
        case 'UPDATE_SEARCH_RESULTS': {
            return updateSearchResults(state, action);
        }

        default:
            break;
    }
}

export const initialState = {
    leoInfo: {},
    seoInfo: {},
    normalizedAddress: {},
    electionInfo: {},
    pollingLocations: [],
    pollingLocationsIndex: 0,
    earlyVoteSites: [],
    earlyVoteSitesIndex: 0,
    dropOffLocations: [],
    dropOffLocationsIndex: 0,
    contests: [],
    isActive: false,
    isError: false,
    showPrivacyPolicy: false,
    showModal: false,
    filterBy: 'All',
    primaryParties: [],
};
