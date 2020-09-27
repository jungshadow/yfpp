import { useEffect, useState } from 'react';

import helpers from 'helpers';

function useElections(dispatch) {
    const [elections, setElections] = useState([]);
    useEffect(() => {
        async function getElections() {
            const requestParams = {};

            const requestURL = helpers.getRequestURL('elections', requestParams);

            try {
                let response = await fetch(requestURL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                });

                response = await response.json();
                setElections(response.elections);
            } catch (error) {
                console.error('error in getLocations call:', error);

                const errorMessage = error;
                console.log(errorMessage.error.message);
                // analytics.failure(errorMessage.error.message);
                // props.onErrorHandler();
            }
        }
        getElections();
    }, [dispatch]);

    return elections;
}

export default useElections;
