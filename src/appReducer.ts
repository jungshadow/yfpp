import { createContext } from 'react';
import updateSearchResults from 'actions/updateSearchResults';
import updateRepresentativesResults from 'actions/updateRepresentativesResults';
import setSearchToggleIsOpen from 'actions/setSearchToggleIsOpen';
import setError from 'actions/setError';
import updateElectionResults from 'actions/updateElectionResults';
import type { AppState, AppAction, AppDispatch } from './types';

export const AppContext = createContext<AppState>({} as AppState);
export const DispatchContext = createContext<AppDispatch>(() => {});

export function appReducer(state: AppState, action: AppAction): AppState {
    switch (action.type) {
        case 'UPDATE_SEARCH_RESULTS': {
            return updateSearchResults(state, action);
        }
        case 'UPDATE_REPRESENTATIVES_RESULTS': {
            return updateRepresentativesResults(state, action);
        }
        case 'UPDATE_ELECTION_RESULTS': {
            return updateElectionResults(state, action);
        }
        case 'SET_SEARCH_TOGGLE_STATUS': {
            return setSearchToggleIsOpen(state, action);
        }
        case 'SET_ERROR': {
            return setError(state, action);
        }

        default:
            return state;
    }
}

export const initialState: AppState = {
    leoInfo: {},
    seoInfo: {},
    normalizedAddress: {},
    electionInfo: {},
    elections: [],
    pollingLocations: [],
    pollingLocationsIndex: 0,
    earlyVoteSites: [],
    earlyVoteSitesIndex: 0,
    dropOffLocations: [],
    dropOffLocationsIndex: 0,
    contests: [],
    isActive: false,
    errors: false,
    showPrivacyPolicy: false,
    showModal: false,
    filterBy: 'All',
    primaryParties: [],
    searchToggleIsOpen: true,
    representatives: [],
    offices: [],
    searchQuery: null
};
