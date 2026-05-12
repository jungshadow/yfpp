import type { AppState, AppAction } from '../types';

export default function updateRepresentativesResults(state: AppState, action: Extract<AppAction, { type: 'UPDATE_REPRESENTATIVES_RESULTS' }>): AppState {
    const { officials = [], offices = [] } = action.data;

    return {
        ...state,
        representatives: officials,
        offices,
        isActive: true,
    };
}
