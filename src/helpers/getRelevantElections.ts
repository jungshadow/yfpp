import type { ElectionInfo } from 'types/api';
import statesMap from 'components/Search/statesMap';

export function parseStateFromSearch(searchValue: string): string | null {
    const searchValueSegments = searchValue
        .replace(/,|[0-9]|United States/gi, '')
        .split(' ')
        .filter(segment => segment !== '')
        .slice(-2);

    if (searchValueSegments[1] && searchValueSegments[1].length > 2) {
        let matchedStates = Object.values(statesMap).filter(state =>
            state.toLowerCase().includes(searchValueSegments[1].toLowerCase()),
        );
        if (matchedStates && matchedStates.length > 1) {
            matchedStates = Object.values(statesMap).filter(state =>
                state
                    .toLowerCase()
                    .includes(
                        `${searchValueSegments[0].toLowerCase()} ${searchValueSegments[1].toLowerCase()}`,
                    ),
            );
        }
        const matched = Object.keys(statesMap).find(key => statesMap[key] === matchedStates[0]);
        return matched ?? null;
    }

    if (searchValueSegments[1] && searchValueSegments[1].length === 2) {
        return searchValueSegments[1].toUpperCase();
    }

    return null;
}

export function filterElectionsByRegion(
    elections: ElectionInfo[],
    usersState: string | null,
): ElectionInfo[] {
    return elections.filter(election => {
        const ocdId = election.ocdDivisionId || '';
        const segments = ocdId.split('/');
        const regionSegment = segments.find(
            s => s.startsWith('state:') || s.startsWith('district:'),
        );

        if (!regionSegment) {
            return true;
        }

        const regionCode = regionSegment.split(':')[1];
        return usersState != null && regionCode === usersState.toLowerCase();
    });
}

export function getRelevantElections(
    elections: ElectionInfo[],
    searchValue: string,
): ElectionInfo[] | undefined {
    if (!elections.length) {
        return;
    }

    const usersState = parseStateFromSearch(searchValue);
    return filterElectionsByRegion(elections, usersState);
}
