import helpers from './helpers';

describe('fucktify', () => {
    it('returns fallback for undefined', () => {
        expect(helpers.fucktify(undefined)).toBe('Some fucking building');
    });

    it('inserts "fucking" after first word for multi-word strings', () => {
        expect(helpers.fucktify('City Hall')).toBe('city fucking hall');
    });

    it('inserts "fucking" after "of"', () => {
        expect(helpers.fucktify('House of Representatives')).toBe(
            'house of fucking representatives',
        );
    });

    it('inserts "fucking" before single word', () => {
        expect(helpers.fucktify('Library')).toBe('fucking library');
    });
});

describe('concatStreetAddress', () => {
    it('concatenates a full address', () => {
        const result = helpers.concatStreetAddress({
            line1: '123 Main St',
            city: 'Portland',
            state: 'OR',
            zip: '97201',
        });
        expect(result).toBe('123 Main St, Portland, OR 97201');
    });

    it('returns comma-separated empties for empty input', () => {
        expect(helpers.concatStreetAddress({})).toBe(', ,  ');
    });
});

describe('titlecase', () => {
    it('title-cases a lowercase string', () => {
        expect(helpers.titlecase('hello world')).toBe('Hello World');
    });

    it('strips underscores and collapses spaces', () => {
        expect(helpers.titlecase('some_thing  weird')).toBe('Something Weird');
    });
});

describe('cleanString', () => {
    it('removes underscores and collapses whitespace', () => {
        expect(helpers.cleanString('hello_world   test')).toBe('helloworld test');
    });
});

describe('lowerCase', () => {
    it('lowercases a string', () => {
        expect(helpers.lowerCase('HELLO')).toBe('hello');
    });

    it('returns undefined for undefined', () => {
        expect(helpers.lowerCase(undefined)).toBeUndefined();
    });
});

describe('slugify', () => {
    it('slugifies a string', () => {
        expect(helpers.slugify('Hello World!')).toBe('hello-world');
    });

    it('collapses multiple dashes', () => {
        expect(helpers.slugify('a - - b')).toBe('a-b');
    });
});

describe('buildQueryString', () => {
    it('builds a query string from params', () => {
        const result = helpers.buildQueryString({ key: 'abc', address: '123 Main St' });
        expect(result).toBe('key=abc&address=123%20Main%20St');
    });

    it('returns empty string for empty params', () => {
        expect(helpers.buildQueryString({})).toBe('');
    });
});

describe('getAddressStringFromObject', () => {
    it('formats address with line2', () => {
        const result = helpers.getAddressStringFromObject({
            line1: '123 Main St',
            line2: 'Apt 4',
            city: 'Portland',
            state: 'OR',
            zip: '97201',
        });
        expect(result).toBe('123 Main St Apt 4 Portland OR 97201');
    });

    it('omits line2 when empty', () => {
        const result = helpers.getAddressStringFromObject({
            line1: '123 Main St',
            line2: '',
            city: 'Portland',
            state: 'OR',
            zip: '97201',
        });
        expect(result).toBe('123 Main St  Portland OR 97201');
    });
});

describe('shuffle', () => {
    it('returns array with same elements', () => {
        const arr = [1, 2, 3, 4, 5];
        const result = helpers.shuffle([...arr]);
        expect(result).toHaveLength(arr.length);
        expect(result.sort()).toEqual(arr.sort());
    });
});

describe('getRequestURL', () => {
    it('builds a civic API URL', () => {
        const url = helpers.getRequestURL('voterinfo', { address: '123 Main St' });
        expect(url).toContain('/voterinfo?');
        expect(url).toContain('address=123%20Main%20St');
        expect(url).toContain('key=');
    });
});
