import React from 'react';

import ElectionTitle from 'components/ElectionTitle';
import Tabs from 'components/Tabs';
import TabPanel from 'components/TabPanel';
import DropOffLocationResults from 'components/DropOffLocationResults';
import PollingPlaceResults from 'components/PollingPlaceResults';
import EarlyVoteSiteResults from 'components/EarlyVoteSiteResults';
import PartySelect from 'components/PartySelect';
import ContestsList from 'components/ContestsList';
import Representatives from 'components/representatives/Representatives';

Results.propTypes = {};

function Results(props) {
    const {
        contests,
        dropOffLocations,
        dropOffLocationsIndex,
        earlyVoteSites,
        earlyVoteSitesIndex,
        electionInfo,
        filterBy,
        handleOnSelect,
        normalizedAddress,
        offices,
        pollingLocations,
        pollingLocationsIndex,
        primaryParties,
        representatives,
        updateDropOffLocations,
        updateEarlyVoteSites,
        updatePollingLocations,
    } = props;
    console.log('results');

    return (
        <div className="wrapper mix-wrapper_bleed">
            <ElectionTitle electionInfo={electionInfo} />
            <Tabs>
                {pollingLocations && (
                    <TabPanel label="Fucking Polling Place" normalizedAddress={normalizedAddress} electionInfo={electionInfo}>
                        <EarlyVoteSiteResults earlyVoteSites={earlyVoteSites} index={earlyVoteSitesIndex} handleChange={updateEarlyVoteSites} />
                        <DropOffLocationResults dropOffLocations={dropOffLocations} index={dropOffLocationsIndex} handleChange={updateDropOffLocations} />
                        <PollingPlaceResults pollingLocations={pollingLocations} index={pollingLocationsIndex} electionInfo={electionInfo} handleChange={updatePollingLocations} />
                    </TabPanel>
                )}
                {representatives && (
                    <TabPanel label="Your Fucking Representatives" normalizedAddress={normalizedAddress} electionInfo={electionInfo}>
                        <Representatives representatives={representatives} offices={offices} />
                    </TabPanel>
                )}
                {primaryParties && (
                    <TabPanel label="On Your Fucking Ballot" normalizedAddress={normalizedAddress} electionInfo={electionInfo}>
                        <div className="group">
                            <div className="group-item">
                                <PartySelect primaryParties={primaryParties} handleOnSelect={handleOnSelect} />
                            </div>
                            <ContestsList contests={contests} filterBy={filterBy} />
                        </div>
                    </TabPanel>
                )}
            </Tabs>
        </div>
    );
}

export default Results;
