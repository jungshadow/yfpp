import React, { useContext } from 'react';

import Tabs from './Tabs';
import TabPanel from './TabPanel';
import DropOffLocationResults from './DropOffLocationResults';
import PollingPlaceResults from './PollingPlaceResults';
import EarlyVoteSiteResults from './EarlyVoteSiteResults';
import PartySelect from './PartySelect';
import ContestsList from './ContestsList';
import { AppContext } from 'appReducer';
import { Switch, Route } from 'react-router-dom';

Results.propTypes = {};

function Results(props) {
    const {
        dropOffLocations,
        dropOffLocationsIndex,
        earlyVoteSites,
        earlyVoteSitesIndex,
        electionInfo,
        normalizedAddress,
        pollingLocations,
        pollingLocationsIndex,
        handleOnSelect,
        updateDropOffLocations,
        updateEarlyVoteSites,
        updatePollingLocations,
        primaryParties,
        contests,
        filterBy,
    } = useContext(AppContext);

    return (
        <Switch>
            <Route path="/polling-place">
                <EarlyVoteSiteResults earlyVoteSites={earlyVoteSites} index={earlyVoteSitesIndex} handleChange={updateEarlyVoteSites} />
                <DropOffLocationResults dropOffLocations={dropOffLocations} index={dropOffLocationsIndex} handleChange={updateDropOffLocations} />
                <PollingPlaceResults pollingLocations={pollingLocations} index={pollingLocationsIndex} electionInfo={electionInfo} handleChange={updatePollingLocations} />
            </Route>
            <Route path="/ballot">
                <div className="group">
                    <div className="group-item">
                        <PartySelect primaryParties={primaryParties} handleOnSelect={handleOnSelect} />
                    </div>
                    <ContestsList contests={contests} filterBy={filterBy} />
                </div>
            </Route>
            <Route path="/representatives"></Route>
        </Switch>
    );
}

export default Results;
