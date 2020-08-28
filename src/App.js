import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { appReducer, initialState, AppContext, DispatchContext } from 'appReducer';
import Site from 'components/Site/Site';

const App = (props) => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    return (
        <AppContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                <Site />
            </DispatchContext.Provider>
        </AppContext.Provider>
    );
};

App.propTypes = {};

export default App;
