//import useQuery from 'hooks/useQuery';
// global helper functions
const isDevelopmentMode = false;//useQuery().get('development');
const API_DEV_VOTER_INFO_URL =
    process.env.PUBLIC_URL + process.env.REACT_APP_API_DEV_VOTER_INFO_URL;
const API_DEV_REPRESENTATIVES_URL =
    process.env.PUBLIC_URL + process.env.REACT_APP_API_DEV_REPRESENTATIVES_URL;
const API_URL = process.env.REACT_APP_API_URL;

let helpers = {
    /**
     * Concatenates an address based on the fields returned from the
     * Google Civic Information API response
     *
     * @method concatStreetAddress
     * @return {string} concatenated address or empty string
     */
    concatStreetAddress: function(obj) {
        var addr = [obj.line1 || '', obj.line2 || '', obj.line3 || ''],
            addr_str = '',
            city = obj.city || '',
            state = obj.state || '',
            zip = obj.zip || '',
            address = '';

        for (var i = 0; i < addr.length; i++) {
            if (addr[i].length > 0 && i !== addr.length - 1) {
                addr_str += ' ' + addr[i].trim();
            }
        }

        addr_str = addr_str.trim();
        address = `${addr_str}, ${city}, ${state} ${zip}`;
        address = address.replace(' ', '') === ',,' ? '' : address;

        return address;
    },

    lowerCase: function(string) {
        if (string) {
            return string.toLowerCase();
        }
    },

    /**
     * Adds "fucking" in various places within a phrase, depending on the phrase
     *
     * @method fucktify
     * @return {string} unsanitized phrase
     */
    fucktify: function(str) {
        if (str === undefined) {
            str = 'Some fucking building';
        } else {
            // I need to standardize the character case because
            // the data is chaos and indexOf uses strict equality
            var str_arr = String(str)
                .toLowerCase()
                .trim()
                .split(' ');
            // assuming two or more words...
            if (str_arr.length >= 2) {
                // ...check for the existence/index of "of"...
                var of_idx = str_arr.indexOf('of');
                if (of_idx > -1) {
                    // ...insert after "of" for great justice...
                    str_arr.splice(of_idx + 1, 0, 'fucking');
                } else {
                    // ...or just stick "fucking" between the 1st and 2nd words
                    str_arr.splice(1, 0, 'fucking');
                }
            } else {
                // else, start the word with "fucking"
                str_arr.splice(0, 0, 'fucking');
            }
            // put that shit back together
            str = str_arr.join(' ');
        }

        return str;
    },

    /**
     * Cleans a string based on some of the data issues seen so far
     *
     * @method cleanString
     * @return {string} cleaned string
     */
    cleanString: function(str) {
        // underscores in names and multiple spaces between words
        var charactersRegex = /_/g,
            multipleSpaces = /\s\s+/g;

        return (
            str && str.replace(charactersRegex, '').replace(multipleSpaces, ' ')
        );
    },

    /**
     * Titlecases a string. So HI EVERYONE becomes "Hi Everyone"
     *
     * @method titlecase
     * @return {string} titlecased string
     */
    titlecase: function(str) {
        var words = '';

        // apparently there are situations where the array
        // could contain multiple blanks between words
        // (e.g. "orange county registrar of fucking voters_     office")
        str = this.cleanString(str);

        if (str) {
            words = str
                .toLowerCase()
                .trim()
                .split(' ');
            for (var i = 0; i < words.length; i++) {
                var letters = words[i].split('');
                letters[0] = letters[0].toUpperCase();
                words[i] = letters.join('');
            }
            words = words.join(' ');
        }

        return words;
    },

    /**
     * Randomly shuffles an array
     *
     * @method shuffle
     * @return {array} randomized array
     */
    shuffle: function(array) {
        var currentIndex = array.length,
            temporaryValue,
            randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    },
    buildQueryString: function(params) {
        return Object.keys(params)
            .map(key => {
                return (
                    encodeURIComponent(key) +
                    '=' +
                    encodeURIComponent(params[key])
                );
            })
            .join('&');
    },
    slugify(str) {
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
    getRequestURL: function(route, requestParams) {
        const baseParams = {
            key: process.env.REACT_APP_API_KEY,
        };

        if (process.env.NODE_ENV === 'development' && isDevelopmentMode) {
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
    getAddressStringFromObject: function({ line1, line2, city, state, zip }) {
        return `${line1} ${line2 ? line2 : ''} ${city} ${state} ${zip}`;
    },
};

export default helpers;
