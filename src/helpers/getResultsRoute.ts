import type { AppState, Contest } from '../types';

export type ResultsRoute =
    | 'polling-place'
    | 'ballot'
    | 'representatives'
    | 'drop-off-sites';

export const RESULTS_PATHNAMES = new Set<string>([
    '/polling-place',
    '/ballot',
    '/representatives',
    '/drop-off-sites',
]);

const LAST_RESULTS_PATH_KEY = 'yfpp:lastResultsPath';

type ResultsRouteInput = Pick<
    AppState,
    | 'earlyVoteSites'
    | 'pollingLocations'
    | 'contests'
    | 'representatives'
    | 'dropOffLocations'
>;

function getPrimaryParties(contests: Contest[]): string[] {
    const parties: string[] = [];
    for (const contest of contests) {
        if (
            contest.primaryParty &&
            contest.primaryParty !== '' &&
            !parties.includes(contest.primaryParty)
        ) {
            parties.push(contest.primaryParty);
        }
    }
    return parties;
}

/** Pick the first results tab that has data (same priority as the old redirect hook). */
export function getResultsRoute({
    earlyVoteSites = [],
    pollingLocations = [],
    contests = [],
    representatives = [],
    dropOffLocations = [],
}: Partial<ResultsRouteInput>): ResultsRoute | undefined {
    if (earlyVoteSites.length > 0 || pollingLocations.length > 0) {
        return 'polling-place';
    }
    const primaryParties = getPrimaryParties(contests);
    if (primaryParties.length > 0 || contests.length > 0) {
        return 'ballot';
    }
    if (representatives.length > 0) {
        return 'representatives';
    }
    if (dropOffLocations.length > 0) {
        return 'drop-off-sites';
    }
    return undefined;
}

export function isResultsPath(pathname: string): boolean {
    return RESULTS_PATHNAMES.has(pathname);
}

/** Remember the results tab the user was on (survives /about and other non-results routes). */
export function rememberResultsPath(pathname: string): void {
    if (isResultsPath(pathname)) {
        sessionStorage.setItem(LAST_RESULTS_PATH_KEY, pathname);
    }
}

/** Path to open for an active search: last tab visited, or the default tab for current data. */
export function getLastResultsPath(input: Partial<ResultsRouteInput>): string {
    const stored = sessionStorage.getItem(LAST_RESULTS_PATH_KEY);
    if (stored && isResultsPath(stored)) {
        return stored;
    }
    const route = getResultsRoute(input);
    return route ? `/${route}` : '/';
}

export function navigateToResultsRoute(
    navigate: (path: string, options?: { replace?: boolean }) => void,
    input: Partial<ResultsRouteInput>,
): void {
    const route = getResultsRoute(input);
    if (route) {
        const path = `/${route}`;
        rememberResultsPath(path);
        navigate(path, { replace: true });
    }
}
