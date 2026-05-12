export default function updateRepresentativesResults(state, action) {
    const { officials, offices } = action.data;

    return {
        ...state,
        representatives: officials,
        offices,
        isActive: true,
    };
}
