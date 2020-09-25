import React, { useContext } from 'react';

import { AppContext } from 'appReducer';
import { Switch, Route } from 'react-router-dom';
import EarlyVoteResults from './EarlyVoteResults/EarlyVoteResults';
import PollingPlaceResults from './PollingPlaceResults/PollingPlaceResults';
import DropOffLocationResults from './DropOffLocationResults/DropOffLocationResults';
import Representatives from './Representatives/Representatives';
import BallotResults from './BallotResults/BallotResults';
import ResultsErrorBoundry from './ResultsErrorBoundry/ResultsErrorBoundry';

Results.propTypes = {};

function Results() {
    const { dropOffLocations, earlyVoteSites, pollingLocations, primaryParties, contests, representatives, offices, errors } = useContext(AppContext);

    return (
        <Switch>
            <Route path="/polling-place">
                <ResultsErrorBoundry errorType="locations" errors={errors}>
                    <EarlyVoteResults locations={earlyVoteSites} />
                    <PollingPlaceResults locations={pollingLocations} />
                </ResultsErrorBoundry>
            </Route>
            <Route path="/ballot">
                <ResultsErrorBoundry errorType="locations" errors={errors}>
                    <BallotResults primaryParties={primaryParties} contests={contests} />
                </ResultsErrorBoundry>
            </Route>
            <Route path="/representatives">
                <ResultsErrorBoundry errorType="representatives" errors={errors}>
                    <Representatives representatives={representatives} offices={offices} />
                </ResultsErrorBoundry>
            </Route>
            <Route path="/drop-off-sites">
                <ResultsErrorBoundry errorType="locations" errors={errors}>
                    <DropOffLocationResults locations={dropOffLocations} />
                </ResultsErrorBoundry>
            </Route>
        </Switch>
    );
}

export default Results;
