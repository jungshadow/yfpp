function setsearchToggleIsOpen(state, action) {
    return {
        ...state,
        searchToggleIsOpen: action.status,
    };
}

export default setsearchToggleIsOpen;
