import React, {useContext} from 'react';
import {AnimatePresence, motion} from 'framer-motion';

import {AppContext} from 'appReducer';
import {Switch, Route} from 'react-router-dom';
import EarlyVoteResults from './EarlyVoteResults/EarlyVoteResults';
import PollingPlaceResults from './PollingPlaceResults/PollingPlaceResults';
import DropOffLocationResults from './DropOffLocationResults/DropOffLocationResults';
import Representatives from './Representatives/Representatives';
import BallotResults from './BallotResults/BallotResults';
import ResultsErrorBoundry from './ResultsErrorBoundry/ResultsErrorBoundry';
import ElectionSelect from './ElectionSelect/ElectionSelect';

Results.propTypes = {};

function Results() {
    const {
        dropOffLocations,
        earlyVoteSites,
        pollingLocations,
        primaryParties,
        contests,
        representatives,
        offices,
        errors
    } = useContext(AppContext);

    const pageVariants = {
        initial: {
            opacity: 0,
            x: '-10%'
        },
        in: {
            opacity: 1,
            x: 0
        },
        out: {
            opacity: 0,
            x: '-10%'
        }
    };

    return (
        <AnimatePresence>
            {/* eslint-disable-next-line */}
            <Switch key={location.pathname}>
                <Route path="/polling-place">
                    <motion.div
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        key="polling-places"
                    >
                        <ResultsErrorBoundry
                            errorType="locations"
                            errors={errors}
                        >
                            <ElectionSelect />
                            <EarlyVoteResults locations={earlyVoteSites} />
                            <PollingPlaceResults locations={pollingLocations} />
                        </ResultsErrorBoundry>
                    </motion.div>
                </Route>
                <Route path="/ballot">
                    <motion.div
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        key="ballot"
                    >
                        <ResultsErrorBoundry
                            errorType="locations"
                            errors={errors}
                        >
                            <ElectionSelect />
                            <BallotResults
                                primaryParties={primaryParties}
                                contests={contests}
                            />
                        </ResultsErrorBoundry>
                    </motion.div>
                </Route>
                <Route path="/representatives">
                    <motion.div
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        key="representatives"
                    >
                        <ResultsErrorBoundry
                            errorType="representatives"
                            errors={errors}
                        >
                            <Representatives
                                representatives={representatives}
                                offices={offices}
                            />
                        </ResultsErrorBoundry>
                    </motion.div>
                </Route>
                <Route path="/drop-off-sites">
                    <motion.div
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        key="drop-off-sites"
                    >
                        <ResultsErrorBoundry
                            errorType="locations"
                            errors={errors}
                        >
                            <ElectionSelect />
                            <DropOffLocationResults
                                locations={dropOffLocations}
                            />
                        </ResultsErrorBoundry>
                    </motion.div>
                </Route>
            </Switch>
        </AnimatePresence>
    );
}

export default Results;
