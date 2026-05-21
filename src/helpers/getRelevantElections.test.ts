import {
    parseStateFromSearch,
    filterElectionsByRegion,
    getRelevantElections,
} from './getRelevantElections';
import type { ElectionInfo } from 'types/api';

const txElection: ElectionInfo = {
    id: '1000',
    name: 'Texas Primary Election',
    electionDay: '2026-03-03',
    ocdDivisionId: 'ocd-division/country:us/state:tx',
};

const dcElection: ElectionInfo = {
    id: '2001',
    name: 'DC General Election',
    electionDay: '2026-11-03',
    ocdDivisionId: 'ocd-division/country:us/district:dc',
};

const caElection: ElectionInfo = {
    id: '3000',
    name: 'California General Election',
    electionDay: '2026-11-03',
    ocdDivisionId: 'ocd-division/country:us/state:ca',
};

const nationalElection: ElectionInfo = {
    id: '4000',
    name: 'US General Election',
    electionDay: '2026-11-03',
    ocdDivisionId: 'ocd-division/country:us',
};

const noOcdElection: ElectionInfo = {
    id: '5000',
    name: 'Mystery Election',
    electionDay: '2026-06-01',
};

const allElections = [txElection, dcElection, caElection, nationalElection, noOcdElection];

describe('parseStateFromSearch', () => {
    it('parses a two-letter state abbreviation', () => {
        expect(parseStateFromSearch('123 Main St, Austin, TX 78701')).toBe('TX');
    });

    it('parses a full state name', () => {
        expect(parseStateFromSearch('123 Main St, Austin, Texas')).toBe('TX');
    });

    it('parses District of Columbia', () => {
        expect(
            parseStateFromSearch('1600 Pennsylvania Ave NW, Washington, District Of Columbia'),
        ).toBe('DC');
    });

    it('parses DC abbreviation', () => {
        expect(parseStateFromSearch('1600 Pennsylvania Ave NW, Washington, DC 20006')).toBe('DC');
    });

    it('handles multi-word state names like New Hampshire', () => {
        expect(parseStateFromSearch('100 Main St, Concord, New Hampshire')).toBe('NH');
    });

    it('handles multi-word state names like New York', () => {
        expect(parseStateFromSearch('100 Broadway, New York, New York')).toBe('NY');
    });

    it('returns null when no state can be parsed', () => {
        expect(parseStateFromSearch('')).toBe(null);
    });

    it('returns null for a single word input', () => {
        expect(parseStateFromSearch('Austin')).toBe(null);
    });

    it('strips numbers and commas when parsing', () => {
        expect(parseStateFromSearch('123 Main St, Portland, OR 97201')).toBe('OR');
    });

    it('strips "United States" from the search string', () => {
        expect(parseStateFromSearch('123 Main St, Portland, OR, United States')).toBe('OR');
    });
});

describe('filterElectionsByRegion', () => {
    it('returns only elections matching the user state', () => {
        const result = filterElectionsByRegion(allElections, 'TX');
        expect(result).toEqual([txElection, nationalElection, noOcdElection]);
    });

    it('matches DC district elections for DC users', () => {
        const result = filterElectionsByRegion(allElections, 'DC');
        expect(result).toEqual([dcElection, nationalElection, noOcdElection]);
    });

    it('excludes DC election for non-DC users', () => {
        const result = filterElectionsByRegion(allElections, 'CA');
        expect(result).not.toContainEqual(dcElection);
    });

    it('excludes state elections that do not match', () => {
        const result = filterElectionsByRegion(allElections, 'TX');
        expect(result).not.toContainEqual(dcElection);
        expect(result).not.toContainEqual(caElection);
    });

    it('includes elections with no region in ocdDivisionId (national)', () => {
        const result = filterElectionsByRegion(allElections, 'TX');
        expect(result).toContainEqual(nationalElection);
    });

    it('includes elections with no ocdDivisionId at all', () => {
        const result = filterElectionsByRegion(allElections, 'TX');
        expect(result).toContainEqual(noOcdElection);
    });

    it('returns only unscoped elections when usersState is null', () => {
        const result = filterElectionsByRegion(allElections, null);
        expect(result).toEqual([nationalElection, noOcdElection]);
    });

    it('handles an empty elections array', () => {
        expect(filterElectionsByRegion([], 'TX')).toEqual([]);
    });
});

describe('getRelevantElections', () => {
    it('returns undefined when elections array is empty', () => {
        expect(getRelevantElections([], '123 Main St, Austin, TX 78701')).toBeUndefined();
    });

    it('filters TX elections for a Texas address', () => {
        const result = getRelevantElections(allElections, '123 Main St, Austin, TX 78701');
        expect(result).toContainEqual(txElection);
        expect(result).not.toContainEqual(dcElection);
        expect(result).not.toContainEqual(caElection);
    });

    it('filters DC elections for a DC address', () => {
        const result = getRelevantElections(
            allElections,
            '1600 Pennsylvania Ave NW, Washington, DC 20006',
        );
        expect(result).toContainEqual(dcElection);
        expect(result).not.toContainEqual(txElection);
        expect(result).not.toContainEqual(caElection);
    });

    it('includes national/unscoped elections alongside state matches', () => {
        const result = getRelevantElections(allElections, '123 Main St, Austin, TX 78701');
        expect(result).toContainEqual(nationalElection);
        expect(result).toContainEqual(noOcdElection);
    });

    it('returns only unscoped elections when state cannot be parsed', () => {
        const result = getRelevantElections(allElections, 'somewhere');
        expect(result).toEqual([nationalElection, noOcdElection]);
    });
});
