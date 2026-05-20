// Civic Information API response types

export interface NormalizedAddress {
    line1: string;
    line2?: string;
    line3?: string;
    city: string;
    state: string;
    zip: string;
}

export interface ElectionInfo {
    id: string;
    name: string;
    electionDay: string;
    ocdDivisionId?: string;
}

export interface ElectionAdministrationBody {
    name?: string;
    electionInfoUrl?: string;
    electionRegistrationUrl?: string;
    electionRegistrationConfirmationUrl?: string;
    absenteeVotingInfoUrl?: string;
    votingLocationFinderUrl?: string;
    ballotInfoUrl?: string;
    correspondenceAddress?: NormalizedAddress;
    physicalAddress?: NormalizedAddress;
}

export interface PollingLocation {
    address: NormalizedAddress;
    name?: string;
    pollingHours?: string;
    startDate?: string;
    endDate?: string;
    latitude?: number;
    longitude?: number;
    notes?: string;
    sources?: Array<{ name: string; official: boolean }>;
}

export interface Candidate {
    name: string;
    party?: string;
    candidateUrl?: string;
    phone?: string;
    photoUrl?: string;
    email?: string;
    channels?: Array<{ type: string; id: string }>;
}

export interface Contest {
    type: string;
    office?: string;
    district?: { name: string; scope?: string };
    level?: string[];
    roles?: string[];
    candidates?: Candidate[];
    referendumTitle?: string;
    referendumSubtitle?: string;
    referendumText?: string;
    referendumUrl?: string;
    referendumBallotResponses?: string[];
    primaryParty?: string;
    sources?: Array<{ name: string; official: boolean }>;
}

export interface Official {
    name: string;
    address?: NormalizedAddress[];
    party?: string;
    phones?: string[];
    urls?: string[];
    photoUrl?: string;
    channels?: Array<{ type: string; id: string }>;
}

export interface Office {
    name: string;
    divisionId: string;
    levels?: string[];
    roles?: string[];
    officialIndices: number[];
}

export interface CivicApiResponse {
    kind?: string;
    election?: ElectionInfo;
    normalizedInput?: NormalizedAddress;
    pollingLocations?: PollingLocation[];
    earlyVoteSites?: PollingLocation[];
    dropOffLocations?: PollingLocation[];
    contests?: Contest[];
    state?: Array<{
        name: string;
        electionAdministrationBody?: ElectionAdministrationBody;
        local_jurisdiction?: {
            name: string;
            electionAdministrationBody?: ElectionAdministrationBody;
        };
    }>;
    error?: {
        code: number;
        message: string;
        errors: Array<{ domain: string; reason: string; message: string }>;
    };
}

export interface RepresentativesApiResponse {
    kind?: string;
    normalizedInput?: NormalizedAddress;
    divisions?: Record<string, { name: string; officeIndices?: number[] }>;
    offices?: Office[];
    officials?: Official[];
    error?: { code: number; message: string };
}

export interface ElectionsApiResponse {
    kind?: string;
    elections?: ElectionInfo[];
}

// Open States API types

export interface OpenStatesCurrentRole {
    title: string;
    org_classification: string;
    district?: string | number;
    division_id?: string;
}

export interface OpenStatesOffice {
    name: string;
    fax?: string;
    voice?: string;
    address?: string;
    classification?: string;
}

export interface OpenStatesPerson {
    id: string;
    name: string;
    party: string;
    current_role?: OpenStatesCurrentRole;
    jurisdiction?: { id: string; name: string; classification: string };
    given_name?: string;
    family_name?: string;
    image?: string;
    email?: string;
    gender?: string;
    openstates_url?: string;
    links?: Array<{ url: string; note?: string }>;
    offices?: OpenStatesOffice[];
}

export interface OpenStatesPeopleResponse {
    results: OpenStatesPerson[];
    pagination: {
        per_page: number;
        page: number;
        max_page: number;
        total_items: number;
    };
}
