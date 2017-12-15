import * as types from '../types';

export const initialState = {
    user: null,
    authorised: false,
    error: null,
};

export function loginReducer(prevState = initialState, action) {
    const newState = Object.assign({}, prevState);

    if (action.type === types.LOGIN_SUCCESS) {
        console.log(action.payload);
        newState.user = action.payload.data;
        newState.authorised = true;
    }
    else if (action.type === types.LOGIN_FAILURE) {
        console.log(action.payload);
        newState.error = action.payload;
    }
    else {
        return prevState;
    }
    return newState;
}