import analytics from 'analytics';
import helpers from 'helpers';

async function getRepresentatives(searchValue) {
    const requestParams = {
        address: searchValue,
    };

    const requestURL = helpers.getRequestURL('representatives', requestParams);
    try {
        const response = await fetch(requestURL);
        const representatives = await response.json();
        return representatives;
    } catch (error) {
        console.error('error in getRepresentatives call:', error);

        const errorMessage = error;
        analytics.failure(errorMessage.error.message);
    }
}

export default getRepresentatives;
