import { isAfter, startOfDay } from 'date-fns';
import type { AppState, AppAction } from '../types';

export default function updateSearchResults(state: AppState, action: Extract<AppAction, { type: 'UPDATE_SEARCH_RESULTS' }>): AppState {
    const {data} = action;
    const leoInfo =
        (data.state &&
            data.state[0] &&
            data.state[0].local_jurisdiction &&
            data.state[0].local_jurisdiction.electionAdministrationBody) ||
        {};
    const seoInfo = (data.state && data.state[0] && data.state[0].electionAdministrationBody) || {};
    const normalizedAddress = data.normalizedInput || {};
    const electionInfo = data.election || {};
    const pollingLocations = data.pollingLocations || [];
    const earlyVoteSites = data.earlyVoteSites || [];
    const dropOffLocations = data.dropOffLocations || [];
    const contests = data.contests || [];
    const errors = data.error ? { locations: data.error as { message: string } } : false;
    const relevantElections = data.relevantElections || [];
    const partyList: string[] = [];
    const searchQuery = data.searchQuery;

    if (
        contests.length > 0 ||
        pollingLocations.length > 0 ||
        earlyVoteSites.length > 0 ||
        dropOffLocations.length > 0
    ) {
        contests.forEach(function (contest) {
            if (
                contest.primaryParty &&
                contest.primaryParty !== '' &&
                partyList.indexOf(contest.primaryParty) === -1
            ) {
                partyList.push(contest.primaryParty);
            }
        });
    }
    const isActive = !!data.normalizedInput;

    // TODO: I'd rather not filter sites by when they're open here, but
    // I'm going to for expediency
    // Early vote sites _should_ be the only sites that we need to worry
    // about being closed
    let i = earlyVoteSites.length;
    while (i--) {
        const endDate = earlyVoteSites[i].endDate;
        if (!endDate || isAfter(startOfDay(new Date()), startOfDay(new Date(endDate)))) {
            earlyVoteSites.splice(i, 1);
        }
    }

    return {
        ...state,
        contests,
        dropOffLocations,
        dropOffLocationsIndex: 0,
        earlyVoteSites,
        earlyVoteSitesIndex: 0,
        electionInfo,
        errors,
        isActive,
        isFuckOff: false,
        leoInfo,
        normalizedAddress,
        pollingLocations,
        pollingLocationsIndex: 0,
        primaryParties: partyList,
        relevantElections,
        searchQuery,
        seoInfo
    };
}
