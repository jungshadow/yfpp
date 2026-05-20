import type { AppState, AppAction } from '../types';

export default function setError(
    state: AppState,
    action: Extract<AppAction, { type: 'SET_ERROR' }>,
): AppState {
    if (!action.error) {
        return {
            ...state,
            errors: false,
        };
    }
    return {
        ...state,
        errors: { ...(state.errors || {}), ...action.error },
    };
}
