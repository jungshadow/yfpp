import React, {useReducer} from 'react';
import {Routes, Route} from 'react-router-dom';

import {appReducer, initialState, AppContext, DispatchContext} from 'appReducer';
import Site from 'components/Site/Site';
import {Page, PageSection} from 'components/Page';
import {AnimatePresence, motion} from 'framer-motion';
import Bios from 'components/Bios/Bios';
import PrivacyPolicy from 'components/PrivacyPolicy/PrivacyPolicy';
import SiteInfo from 'components/SiteInfo/SiteInfo';

const App = () => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    const pageVariants = {
        initial: {
            opacity: 0,
            height: '100%'
        },
        in: {
            opacity: 1
        },
        out: {
            opacity: 0
        }
    };

    return (
        <AppContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                <AnimatePresence>
                    <Routes>
                        <Route path="/about" element={
                            <motion.div
                                initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageVariants}
                                key="aboutRoute"
                            >
                                <Page title="About">
                                    <PageSection>
                                        <Bios />
                                    </PageSection>
                                    <PageSection>
                                        <SiteInfo />
                                    </PageSection>
                                </Page>
                            </motion.div>
                        } />
                        <Route path="/privacy-policy" element={
                            <motion.div
                                initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageVariants}
                                key="privacyPolicyRoute"
                            >
                                <Page title="Privacy Policy" isNarrow>
                                    <PrivacyPolicy />
                                </Page>
                            </motion.div>
                        } />
                        <Route path="/*" element={
                            <motion.div
                                initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageVariants}
                                key="homeRoute"
                            >
                                <Site />
                            </motion.div>
                        } />
                    </Routes>
                </AnimatePresence>
            </DispatchContext.Provider>
        </AppContext.Provider>
    );
};

export default App;
