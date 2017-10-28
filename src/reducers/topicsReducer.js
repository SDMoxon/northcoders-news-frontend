import * as types from '../types';
import {normaliseData} from '../utils';
export const initialState = {
    topics: {},
    loading: false,
    error: null,
};

export function topicsReducer(prevState = initialState, action) {
    const newState = Object.assign({}, prevState);

    if (action.type === types.FETCH_TOPICS_REQUEST) {
        newState.loading = true;
    }
    else if (action.type === types.FETCH_TOPICS_SUCCESS) {
        newState.topics = normaliseData(action.payload);
        newState.loading = false;
    }
    else if (action.type === types.FETCH_TOPICS_FAILURE) {
        newState.error = action.payload;
        newState.loading = false;
    }
    else {
        return prevState;
    }
    return newState;
}