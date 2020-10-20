import {useEffect} from 'react';

import helpers from 'helpers';

function useElections(dispatch) {
    useEffect(() => {
        async function getElections() {
            const requestParams = {};

            const requestURL = helpers.getRequestURL(
                'elections',
                requestParams
            );

            try {
                let response = await fetch(requestURL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    }
                });

                response = await response.json();

                dispatch({
                    type: 'UPDATE_ELECTION_RESULTS',
                    elections: response.elections
                });
            } catch (error) {
                console.error('error in get Elections call:', error);

                const errorMessage = error;
                console.log(errorMessage.error.message);
                // analytics.failure(errorMessage.error.message);
                // props.onErrorHandler();
            }
        }
        getElections();
    }, [dispatch]);
}

export default useElections;
