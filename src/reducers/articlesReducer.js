import * as types from '../types';
import {processListData} from '../utils';


export const initialState = {
    articles: {},
    loading: false,
    error: null,
};

export function articlesReducer(prevState = initialState, action) {
    const newState = Object.assign({}, prevState);

    if (action.type === types.FETCH_ARTICLES_REQUEST) {
        newState.loading = true;
    }
    else if (action.type === types.FETCH_ARTICLES_SUCCESS) {
        newState.articles = processListData(action.payload);
        newState.loading = false;
    }
    else if (action.type === types.FETCH_ARTICLES_FAILURE) {
        newState.error = action.payload;
        newState.loading = false;
    }
    else if (action.type === types.CHANGE_COMMENT_VISIBILITY) {
        
        newState.articles[action.payload] = Object.assign({}, prevState.articles[action.payload]);
        
        newState.articles[action.payload].commentVisable = !newState.articles[action.payload].commentVisable;
        
    }
    else if (action.type === types.ARTICLE_ALTER_VOTES_REQUEST) {
        newState.sending = true;
    }
    else if (action.type === types.ARTICLE_ALTER_VOTES_SUCCESS) {
        const vote = action.payload.vote === 'up' ? 1 : -1;
        newState.articles = Object.assign({}, newState.articles);
        newState.articles[action.payload._id] = Object.assign({}, newState.articles[action.payload._id]);
        newState.articles[action.payload._id].votes += vote;
        newState.sending = false;
    }
    else if (action.type === types.ARTICLE_ALTER_VOTES_FAILURE) {
        newState.error = action.payload.error;
        newState.sending = false;
    }
    else {
        return prevState;
    }
    return newState;
}