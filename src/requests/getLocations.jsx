import analytics from 'analytics';
import helpers from 'helpers';

async function getLocations(searchValue, electionId) {
    const requestParams = {
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

        const locations = await response.json();
        return locations;
    } catch (error) {
        console.error('error in getLocations call:', error);
        const errorMessage = error;
        analytics.failure(errorMessage.error.message);
    }
}

export default getLocations;
