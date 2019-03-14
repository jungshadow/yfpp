import React from 'react';
import PropTypes from 'prop-types';
import ElectionTitle from './ElectionTitle';
import Tabs from './Tabs';
import TabPanel from './TabPanel';
import DropOffLocationResults from './DropOffLocationResults';
import PollingPlaceResults from './PollingPlaceResults';
import EarlyVoteSiteResults from './EarlyVoteSiteResults';
import PartySelect from './PartySelect';
import ContestsList from './ContestsList';

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
    } = props;
    return (
        <div className="wrapper mix-wrapper_bleed">
            <ElectionTitle electionInfo={electionInfo} />
            <Tabs>
                <TabPanel label="Fucking Polling Place" normalizedAddress={normalizedAddress} electionInfo={electionInfo}>
                    <EarlyVoteSiteResults earlyVoteSites={earlyVoteSites} index={earlyVoteSitesIndex} handleChange={updateEarlyVoteSites} />
                    <DropOffLocationResults dropOffLocations={dropOffLocations} index={dropOffLocationsIndex} handleChange={updateDropOffLocations} />
                    <PollingPlaceResults pollingLocations={pollingLocations} index={pollingLocationsIndex} electionInfo={electionInfo} handleChange={updatePollingLocations} />
                </TabPanel>
                <TabPanel label="On Your Fucking Ballot" normalizedAddress={normalizedAddress} electionInfo={electionInfo}>
                    <div className="group">
                        <div className="group-item">
                            <PartySelect primaryParties={primaryParties} handleOnSelect={handleOnSelect} />
                        </div>
                        <ContestsList contests={contests} filterBy={filterBy} />
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
}

export default Results;
