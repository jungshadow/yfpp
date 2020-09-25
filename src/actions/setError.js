import moment from 'moment';

export default function setError(state, action) {
    console.log(action);
    return {
        ...state,
        errors: { ...state.errors, ...action.error },
    };
}
