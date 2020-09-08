import React, { useReducer } from 'react';

import { appReducer, initialState, AppContext, DispatchContext } from 'appReducer';
import Site from 'components/Site/Site';

const App = () => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    return (
        <AppContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                <Site />
            </DispatchContext.Provider>
        </AppContext.Provider>
    );
};

export default App;
