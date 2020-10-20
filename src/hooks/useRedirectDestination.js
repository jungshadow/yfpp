const useRedirectDestination = ({
    earlyVoteSites = [],
    pollingLocations = [],
    primaryParties = [],
    contests = [],
    representatives = [],
    dropOffLocations = []
}) => {
    if (earlyVoteSites.length > 0 || pollingLocations.length > 0) {
        return 'polling-place';
    }
    if (primaryParties.length > 0 || contests.length > 0) {
        return 'ballot';
    }
    if (representatives.length > 0) {
        return 'representatives';
    }
    if (dropOffLocations.length > 0) {
        return 'drop-off-sites';
    }
};

export default useRedirectDestination;
