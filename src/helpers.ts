import type { NormalizedAddress } from './types/api';

const isDevelopmentMode = false;
const API_DEV_VOTER_INFO_URL = import.meta.env.VITE_API_DEV_VOTER_INFO_URL || '';
const API_DEV_REPRESENTATIVES_URL = import.meta.env.VITE_API_DEV_REPRESENTATIVES_URL || '';
const API_URL = import.meta.env.VITE_API_URL;

const helpers = {
    concatStreetAddress(obj: Partial<NormalizedAddress>): string {
        const addr = [obj.line1 || '', obj.line2 || '', obj.line3 || ''];
        let addr_str = '';
        const city = obj.city || '';
        const state = obj.state || '';
        const zip = obj.zip || '';

        for (let i = 0; i < addr.length; i++) {
            if (addr[i].length > 0 && i !== addr.length - 1) {
                addr_str += ' ' + addr[i].trim();
            }
        }

        addr_str = addr_str.trim();
        const address = `${addr_str}, ${city}, ${state} ${zip}`;
        return address.replace(' ', '') === ',,' ? '' : address;
    },

    lowerCase(string: string | undefined): string | undefined {
        if (string) {
            return string.toLowerCase();
        }
        return undefined;
    },

    fucktify(str: string | undefined): string {
        if (str === undefined) {
            return 'Some fucking building';
        }

        const str_arr = String(str).toLowerCase().trim().split(' ');

        if (str_arr.length >= 2) {
            const of_idx = str_arr.indexOf('of');
            if (of_idx > -1) {
                str_arr.splice(of_idx + 1, 0, 'fucking');
            } else {
                str_arr.splice(1, 0, 'fucking');
            }
        } else {
            str_arr.splice(0, 0, 'fucking');
        }

        return str_arr.join(' ');
    },

    cleanString(str: string): string {
        const charactersRegex = /_/g;
        const multipleSpaces = /\s\s+/g;
        return str && str.replace(charactersRegex, '').replace(multipleSpaces, ' ');
    },

    titlecase(str: string): string {
        let result = '';
        const cleaned = this.cleanString(str);

        if (cleaned) {
            const words = cleaned.toLowerCase().trim().split(' ');
            for (let i = 0; i < words.length; i++) {
                const letters = words[i].split('');
                letters[0] = letters[0].toUpperCase();
                words[i] = letters.join('');
            }
            result = words.join(' ');
        }

        return result;
    },

    shuffle<T>(array: T[]): T[] {
        let currentIndex = array.length;
        while (0 !== currentIndex) {
            const randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            const temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    },

    buildQueryString(params: Record<string, string>): string {
        return Object.keys(params)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
            .join('&');
    },

    slugify(str: string): string {
        return str
            .toString()
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    },

    getRequestURL(route: string, requestParams: Record<string, string> = {}): string {
        const baseParams: Record<string, string> = {
            key: import.meta.env.VITE_API_KEY,
        };

        if (import.meta.env.DEV && isDevelopmentMode) {
            if (route === 'voterinfo') {
                return API_DEV_VOTER_INFO_URL;
            }
            if (route === 'representatives') {
                return API_DEV_REPRESENTATIVES_URL;
            }
        }

        return `${API_URL}/${route}?${helpers.buildQueryString({
            ...baseParams,
            ...requestParams,
        })}`;
    },

    getAddressStringFromObject({ line1, line2, city, state, zip }: NormalizedAddress): string {
        return `${line1} ${line2 ? line2 : ''} ${city} ${state} ${zip}`;
    },
};

export default helpers;
