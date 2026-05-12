import analytics from 'analytics';
import helpers from 'helpers';
import type { CivicApiResponse } from '../types/api';

async function getLocations(searchValue: string, electionId?: string): Promise<CivicApiResponse | undefined> {
    const requestParams: Record<string, string> = {
        address: searchValue,
    };
    if (electionId) {
        requestParams.electionId = electionId;
    }

    const requestURL = helpers.getRequestURL('voterinfo', requestParams);

    try {
        const response = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        const locations: CivicApiResponse = await response.json();
        return locations;
    } catch (error) {
        console.error('error in getLocations call:', error);
        analytics.failure(error as string);
    }
}

export default getLocations;
