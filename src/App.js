import React, {useReducer} from 'react';
import {Switch, Route} from 'react-router-dom';

import {
    appReducer,
    initialState,
    AppContext,
    DispatchContext
} from 'appReducer';
import Site from 'components/Site/Site';
import {Redirect} from 'react-router-dom';
import Page from 'components/Page/Page';
import {AnimatePresence, motion} from 'framer-motion';
import Bios from 'components/Bios/Bios';
import useRedirectDestination from 'hooks/useRedirectDestination';

const App = () => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    const redirectDestination = useRedirectDestination(state);

    const pageVariants = {
        initial: {
            opacity: 0,
            x: '-50%'
        },
        in: {
            opacity: 1,
            x: 0
        },
        out: {
            opacity: 0,
            x: '-50%'
        }
    };

    return (
        <AppContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {state.isActive && <Redirect to={`/${redirectDestination}`} />}
                <AnimatePresence>
                    <Switch>
                        <Route path="/about">
                            <motion.div
                                initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageVariants}
                                key="aboutRoute"
                            >
                                <Page title="About">
                                    <Bios />
                                </Page>
                            </motion.div>
                        </Route>
                        <Route path="/">
                            <motion.div
                                initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageVariants}
                                key="homeRoute"
                            >
                                <Site />
                            </motion.div>
                        </Route>
                    </Switch>
                </AnimatePresence>
            </DispatchContext.Provider>
        </AppContext.Provider>
    );
};

export default App;
