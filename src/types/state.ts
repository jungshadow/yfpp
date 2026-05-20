import type { Dispatch } from 'react';
import type {
    NormalizedAddress,
    ElectionInfo,
    ElectionAdministrationBody,
    PollingLocation,
    Contest,
    Official,
    Office,
    CivicApiResponse,
    RepresentativesApiResponse,
} from './api';

// App state shape
export interface AppState {
    leoInfo: Partial<ElectionAdministrationBody>;
    seoInfo: Partial<ElectionAdministrationBody>;
    normalizedAddress: Partial<NormalizedAddress>;
    electionInfo: Partial<ElectionInfo>;
    elections: ElectionInfo[];
    pollingLocations: PollingLocation[];
    pollingLocationsIndex: number;
    earlyVoteSites: PollingLocation[];
    earlyVoteSitesIndex: number;
    dropOffLocations: PollingLocation[];
    dropOffLocationsIndex: number;
    contests: Contest[];
    isActive: boolean;
    isFuckOff?: boolean;
    errors: AppErrors | false;
    showPrivacyPolicy: boolean;
    showModal: boolean;
    filterBy: string;
    primaryParties: string[];
    searchToggleIsOpen: boolean;
    representatives: Official[];
    offices: Office[];
    relevantElections?: ElectionInfo[];
    pendingElections?: ElectionInfo[];
    searchQuery: string | null;
}

export interface AppErrors {
    locations?: { message: string; [key: string]: unknown };
    representatives?: { message: string; [key: string]: unknown };
    [key: string]: { message: string; [key: string]: unknown } | undefined;
}

// Action types
export type AppAction =
    | {
          type: 'UPDATE_SEARCH_RESULTS';
          data: CivicApiResponse & { searchQuery: string; relevantElections?: ElectionInfo[] };
      }
    | { type: 'UPDATE_REPRESENTATIVES_RESULTS'; data: RepresentativesApiResponse }
    | { type: 'UPDATE_ELECTION_RESULTS'; elections?: ElectionInfo[] }
    | { type: 'SET_SEARCH_TOGGLE_STATUS'; status: boolean }
    | { type: 'SET_ERROR'; error?: Partial<AppErrors> | false }
    | { type: 'SET_PENDING_ELECTIONS'; elections: ElectionInfo[]; searchQuery: string };

export type AppDispatch = Dispatch<AppAction>;
