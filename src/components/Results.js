import React, { useContext } from 'react';

import PartySelect from './PartySelect';
import ContestsList from './ContestsList';
import { AppContext } from 'appReducer';
import { Switch, Route } from 'react-router-dom';
import EarlyVoteResults from './EarlyVoteResults/EarlyVoteResults';
import PollingPlaceResults from './PollingPlaceResults/PollingPlaceResults';
import DropOffLocationResults from './DropOffLocationResults/DropOffLocationResults';
import Representatives from './Representatives/Representatives';

Results.propTypes = {};

function Results() {
    const { dropOffLocations, earlyVoteSites, pollingLocations, handleOnSelect, primaryParties, contests, filterBy, representatives, offices } = useContext(AppContext);

    return (
        <Switch>
            <Route path="/polling-place">
                <EarlyVoteResults locations={earlyVoteSites} />
                <PollingPlaceResults locations={pollingLocations} />
            </Route>
            <Route path="/ballot">
                <div className="group">
                    <div className="group-item">
                        <PartySelect primaryParties={primaryParties} handleOnSelect={handleOnSelect} />
                    </div>
                    <ContestsList contests={contests} filterBy={filterBy} />
                </div>
            </Route>
            <Route path="/representatives">
                <Representatives representatives={representatives} offices={offices} />
            </Route>

            <Route path="/drop-off-sites">
                <DropOffLocationResults locations={dropOffLocations} />
            </Route>
        </Switch>
    );
}

export default Results;
