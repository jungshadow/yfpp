import helpers from '../helpers';
import analytics from '../analytics';

class APIService {
    static API_URL_DEV = process.env.PUBLIC_URL + process.env.REACT_APP_API_DEV_URL;
    static API_URL = process.env.REACT_APP_API_URL;

    static getRequestURL(route, requestParams) {
        const baseParams = {
            key: process.env.REACT_APP_API_KEY,
        };

        switch (process.env.NODE_ENV) {
            // case 'development':
            //     return this.API_URL_DEV;

            default:
                return `${this.API_URL}/${route}?${helpers.buildQueryString({ ...baseParams, ...requestParams })}`;
        }
    }

    static getRepresentatives = async searchQuery => {
        const requestParams = {
            address: searchQuery,
        };

        const requestURL = this.getRequestURL('representatives', requestParams);
        return fetch(requestURL)
            .then(response => {
                if (!response.ok) {
                    throw response;
                }

                return response.json();
            })
            .catch(error => {
                console.error(error);

                const errorMessage = error;
                analytics.failure(errorMessage.error.message);
            });
    };

    static getLocations = async searchQuery => {
        const requestParams = {
            address: searchQuery,
        };

        const requestURL = APIService.getRequestURL('voterinfo', requestParams);

        return fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw response;
                }

                return response.json();
            })
            .catch(error => {
                console.error(error);

                const errorMessage = error;
                analytics.failure(errorMessage.error.message);
            });
    };
}

export default APIService;
