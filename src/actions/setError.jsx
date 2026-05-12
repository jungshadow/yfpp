export default function setError(state, action) {
    if (!action.error) {
        return {
            ...state,
            errors: false
        };
    }
    return {
        ...state,
        errors: {...state.errors, ...action.error}
    };
}
