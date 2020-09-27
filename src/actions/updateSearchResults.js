import moment from 'moment';

export default function updateSearchResults(state, action) {
    const { data } = action;
    const leoInfo = (data.state && data.state[0] && data.state[0].local_jurisdiction && data.state[0].local_jurisdiction.electionAdministrationBody) || {};
    const seoInfo = (data.state && data.state[0] && data.state[0].electionAdministrationBody) || {};
    const normalizedAddress = data.normalizedInput || {};
    const electionInfo = data.election || {};
    const pollingLocations = data.pollingLocations || [];
    const earlyVoteSites = data.earlyVoteSites || [];
    const dropOffLocations = data.dropOffLocations || [];
    const contests = data.contests || [];
    const relevantElections = data.relevantElections || [];
    let partyList = [];
    const searchQuery = data.searchQuery;

    let isActive = false;

    if (contests.length > 0 || pollingLocations.length > 0 || earlyVoteSites.length > 0 || dropOffLocations.length > 0) {
        Object.keys(contests).forEach(function(key) {
            if (contests[key].primaryParty && contests[key].primaryParty !== '' && partyList.indexOf(contests[key].primaryParty) === -1) {
                return partyList.push(contests[key].primaryParty);
            }
            return false;
        });

        isActive = true;
    }
    if (data.normalizedInput) {
        isActive = true;
    } else {
        isActive = false;
    }

    // TODO: I'd rather not filter sites by when they're open here, but
    // I'm going to for expediency
    // Early vote sites _should_ be the only sites that we need to worry
    // about being closed
    var i = earlyVoteSites.length;
    while (i--) {
        if (!earlyVoteSites[i].endDate || moment().isAfter(moment(earlyVoteSites[i].endDate), 'day')) {
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
        isActive,
        isFuckOff: false,
        leoInfo,
        normalizedAddress,
        pollingLocations,
        pollingLocationsIndex: 0,
        primaryParties: partyList,
        relevantElections,
        searchQuery,
        seoInfo,
    };
}
