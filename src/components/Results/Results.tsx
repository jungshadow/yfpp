import React, { useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { AppContext } from 'appReducer';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getLastResultsPath } from 'helpers/getResultsRoute';
import EarlyVoteResults from 'components/EarlyVoteResults/EarlyVoteResults';
import PollingPlaceResults from 'components/PollingPlaceResults/PollingPlaceResults';
import DropOffLocationResults from 'components/DropOffLocationResults/DropOffLocationResults';
import Representatives from 'components/Representatives/Representatives';
import BallotResults from 'components/BallotResults/BallotResults';
import ResultsErrorBoundry from 'components/ResultsErrorBoundry/ResultsErrorBoundry';
import ElectionPicker from 'components/ElectionPicker/ElectionPicker';
import ResultMessage from 'components/ResultMessage/ResultMessage';
import Tabs from 'components/Tabs/Tabs';
import TabPanel from 'components/Tabs/TabPanel';

function ResultsIndexRedirect() {
    const state = useContext(AppContext);
    const path = getLastResultsPath(state);
    if (path === '/') {
        return null;
    }
    return <Navigate to={path} replace />;
}

function Results() {
    const {
        dropOffLocations,
        earlyVoteSites,
        pollingLocations,
        primaryParties,
        contests,
        representatives,
        offices,
        errors,
    } = useContext(AppContext);

    const pageVariants = {
        initial: {
            opacity: 0,
            left: '-10%',
        },
        in: {
            opacity: 1,
            left: 0,
        },
        out: {
            opacity: 0,
            left: '-10%',
        },
    };

    return (
        <AnimatePresence>
            <Routes>
                <Route index element={<ResultsIndexRedirect />} />
                <Route
                    path="/polling-place"
                    element={
                        <motion.div
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            key="polling-places"
                        >
                            <ResultsErrorBoundry errorType="locations" errors={errors}>
                                <ResultMessage>
                                    <p>
                                        <strong>You have the right to vote.</strong> If anyone tries
                                        to stop you, call or text the National Election Protection
                                        Hotline. Their number is 866-OUR-VOTE
                                        <a href="tel:866-687-8683"> (866-687-8683)</a>.
                                    </p>
                                </ResultMessage>
                                <ElectionPicker />
                                <Tabs>
                                    {earlyVoteSites && earlyVoteSites.length > 0 && (
                                        <TabPanel label="Early Voting Sites">
                                            <EarlyVoteResults locations={earlyVoteSites} />
                                        </TabPanel>
                                    )}
                                    {pollingLocations && pollingLocations.length > 0 && (
                                        <TabPanel label="Polling Locations">
                                            <PollingPlaceResults locations={pollingLocations} />
                                        </TabPanel>
                                    )}
                                </Tabs>
                            </ResultsErrorBoundry>
                        </motion.div>
                    }
                />
                <Route
                    path="/ballot"
                    element={
                        <motion.div
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            key="ballot"
                        >
                            <ResultsErrorBoundry errorType="locations" errors={errors}>
                                <ElectionPicker />
                                <BallotResults
                                    primaryParties={primaryParties}
                                    contests={contests}
                                />
                            </ResultsErrorBoundry>
                        </motion.div>
                    }
                />
                <Route
                    path="/representatives"
                    element={
                        <motion.div
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            key="representatives"
                        >
                            <ElectionPicker />
                            <ResultMessage>
                                <p>
                                    <strong>
                                        These are the fuckers that currently represent you.
                                    </strong>
                                </p>
                            </ResultMessage>
                            <ResultsErrorBoundry errorType="representatives" errors={errors}>
                                <Representatives
                                    representatives={representatives}
                                    offices={offices}
                                />
                            </ResultsErrorBoundry>
                        </motion.div>
                    }
                />
                <Route
                    path="/drop-off-sites"
                    element={
                        <motion.div
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            key="drop-off-sites"
                        >
                            <ResultsErrorBoundry errorType="locations" errors={errors}>
                                <ResultMessage>
                                    <p>
                                        <strong>You have the right to vote.</strong> If anyone tries
                                        to stop you, call or text the National Election Protection
                                        Hotline. Their number is 866-OUR-VOTE
                                        <a href="tel:866-687-8683"> (866-687-8683)</a>.
                                    </p>
                                </ResultMessage>
                                <ElectionPicker />
                                <DropOffLocationResults locations={dropOffLocations} />
                            </ResultsErrorBoundry>
                        </motion.div>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
}

export default Results;
