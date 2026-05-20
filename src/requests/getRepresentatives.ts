import analytics from 'analytics';
import mbxClient from '@mapbox/mapbox-sdk';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import type {
    OpenStatesPeopleResponse,
    OpenStatesPerson,
    RepresentativesApiResponse,
} from '../types/api';

const OPEN_STATES_API_URL = 'https://v3.openstates.org';
const OPEN_STATES_API_KEY = import.meta.env.VITE_OPENSTATES_API_KEY;

const MBX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_API_ACCESS_TOKEN;
const baseClient = mbxClient({ accessToken: MBX_ACCESS_TOKEN });
const geocodingService = mbxGeocoding(baseClient);

/**
 * Geocode an address string to lat/lng using Mapbox.
 */
async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
    const response = await geocodingService
        .forwardGeocode({
            query: address,
            limit: 1,
            types: ['address'],
            countries: ['US'],
        })
        .send();

    const features = response.body.features;
    if (!features.length) return null;

    const [lng, lat] = features[0].center;
    return { lat, lng };
}

/**
 * Transform Open States Person objects into the existing Official/Office
 * shape so downstream components don't need to change.
 */
function transformOpenStatesResponse(people: OpenStatesPerson[]): RepresentativesApiResponse {
    const officials = people.map(person => ({
        name: person.name,
        party: person.party || undefined,
        photoUrl: person.image || undefined,
        urls: person.links?.map(l => l.url),
        channels: undefined,
    }));

    const offices = people.map((person, index) => ({
        name: person.current_role?.title
            ? `${person.current_role.title}${person.current_role.district ? ` — District ${person.current_role.district}` : ''}`
            : 'Unknown Office',
        divisionId: person.current_role?.division_id || '',
        levels: person.current_role?.org_classification
            ? [person.current_role.org_classification]
            : [],
        officialIndices: [index],
    }));

    return { officials, offices };
}

async function getRepresentatives(
    searchValue: string,
): Promise<RepresentativesApiResponse | undefined> {
    try {
        const coords = await geocodeAddress(searchValue);
        if (!coords) {
            console.warn('Could not geocode address for representatives lookup');
            return undefined;
        }

        const url = `${OPEN_STATES_API_URL}/people.geo?lat=${encodeURIComponent(coords.lat)}&lng=${encodeURIComponent(coords.lng)}&apikey=${encodeURIComponent(OPEN_STATES_API_KEY)}`;
        const response = await fetch(url, { signal: AbortSignal.timeout(10_000) });

        if (!response.ok) {
            const errorBody = await response.json().catch(() => ({}));
            console.error('Open States API error:', response.status, errorBody);
            return {
                error: {
                    code: response.status,
                    message:
                        (errorBody as { detail?: string }).detail ||
                        'Representatives lookup failed',
                },
            };
        }

        const data: OpenStatesPeopleResponse = await response.json();
        return transformOpenStatesResponse(data.results);
    } catch (error) {
        console.error('error in getRepresentatives call:', error);
        analytics.failure(error as string);
    }
}

export default getRepresentatives;
