export default function setError(state, action) {
    return {
        ...state,
        errors: {...state.errors, ...action.error}
    };
}
