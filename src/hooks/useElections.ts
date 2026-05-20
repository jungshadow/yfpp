import { useEffect } from 'react';

import helpers from 'helpers';
import type { AppDispatch } from '../types';
import type { ElectionsApiResponse } from '../types/api';

function useElections(dispatch: AppDispatch): void {
    useEffect(() => {
        async function getElections() {
            const requestParams = {};

            const requestURL = helpers.getRequestURL('elections', requestParams);

            try {
                const response = await fetch(requestURL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                });

                if (!response.ok) {
                    console.error('Elections API returned', response.status);
                    return;
                }

                const data: ElectionsApiResponse = await response.json();

                dispatch({
                    type: 'UPDATE_ELECTION_RESULTS',
                    elections: data.elections || [],
                });
            } catch (error) {
                console.error('error in get Elections call:', error);
            }
        }
        getElections();
    }, [dispatch]);
}

export default useElections;
