import React, { useReducer } from 'react';
import { Switch, Route } from 'react-router-dom';

import { appReducer, initialState, AppContext, DispatchContext } from 'appReducer';
import Site from 'components/Site/Site';
import { Redirect } from 'react-router-dom';
import About from 'components/About/About';

const App = () => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {state.isActive && <Redirect to="/polling-place" />}
                <Switch>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/">
                        <Site />
                    </Route>
                </Switch>
            </DispatchContext.Provider>
        </AppContext.Provider>
    );
};

export default App;
