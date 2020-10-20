export default function setLocationIsExpanded(state, action) {
    return {
        ...state,
        locationIsExpanded: action.isExpanded,
    };
}
