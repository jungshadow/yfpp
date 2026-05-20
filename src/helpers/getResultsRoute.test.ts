import { describe, it, expect } from 'vitest';
import {
    getResultsRoute,
    getLastResultsPath,
    rememberResultsPath,
    RESULTS_PATHNAMES,
} from './getResultsRoute';

describe('getResultsRoute', () => {
    it('prefers polling place when locations exist', () => {
        expect(
            getResultsRoute({
                pollingLocations: [{ address: {} } as never],
                representatives: [{ name: 'Jane' } as never],
            }),
        ).toBe('polling-place');
    });

    it('returns ballot when only contests exist', () => {
        expect(
            getResultsRoute({
                contests: [{ primaryParty: 'Democratic' } as never],
            }),
        ).toBe('ballot');
    });

    it('returns representatives when only officials exist', () => {
        expect(
            getResultsRoute({
                representatives: [{ name: 'Jane' } as never],
            }),
        ).toBe('representatives');
    });

    it('returns drop-off-sites when only drop-off locations exist', () => {
        expect(
            getResultsRoute({
                dropOffLocations: [{ address: {} } as never],
            }),
        ).toBe('drop-off-sites');
    });

    it('returns undefined when there is no results data', () => {
        expect(getResultsRoute({})).toBeUndefined();
    });
});

describe('getLastResultsPath', () => {
    beforeEach(() => {
        sessionStorage.clear();
    });

    it('returns the last visited results pathname', () => {
        rememberResultsPath('/representatives');
        expect(
            getLastResultsPath({
                pollingLocations: [{ address: {} } as never],
            }),
        ).toBe('/representatives');
    });

    it('falls back to getResultsRoute when nothing is stored', () => {
        expect(
            getLastResultsPath({
                representatives: [{ name: 'Jane' } as never],
            }),
        ).toBe('/representatives');
    });

    it('exports all results pathnames', () => {
        expect(RESULTS_PATHNAMES.size).toBe(4);
    });
});
