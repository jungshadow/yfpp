import type { AppState, AppAction } from '../types';

function setSearchToggleIsOpen(state: AppState, action: Extract<AppAction, { type: 'SET_SEARCH_TOGGLE_STATUS' }>): AppState {
    return {
        ...state,
        searchToggleIsOpen: action.status,
    };
}

export default setSearchToggleIsOpen;
