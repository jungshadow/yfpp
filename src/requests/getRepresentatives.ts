import analytics from 'analytics';
import helpers from 'helpers';
import type { RepresentativesApiResponse } from '../types/api';

async function getRepresentatives(searchValue: string): Promise<RepresentativesApiResponse | undefined> {
    const requestParams: Record<string, string> = {
        address: searchValue,
    };

    const requestURL = helpers.getRequestURL('representatives', requestParams);
    try {
        const response = await fetch(requestURL);
        const representatives: RepresentativesApiResponse = await response.json();
        return representatives;
    } catch (error) {
        console.error('error in getRepresentatives call:', error);
        analytics.failure(error as string);
    }
}

export default getRepresentatives;
