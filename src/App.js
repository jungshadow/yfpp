import React, { useReducer } from 'react';

import { appReducer, initialState, AppContext, DispatchContext } from 'appReducer';
import Site from 'components/Site/Site';
import { Redirect } from 'react-router-dom';

const App = () => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {state.isActive && <Redirect to="/polling-place" />}
                <Site />
            </DispatchContext.Provider>
        </AppContext.Provider>
    );
};

export default App;
