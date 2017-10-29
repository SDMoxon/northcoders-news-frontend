import * as types from '../types';
import axios from 'axios';
const ROOT = 'http://localhost:3080/api';

export function fetchAllArticles(topic) {
    return function (dispatch) {
        let getURL = ROOT;
        getURL += topic
            ? `/topics/${topic}/articles`
            : '/articles';
        dispatch(fetchArticlesRequest());
        axios
            .get(getURL)
            .then(res => {

                dispatch(fetchArticlesSuccess(res.data.articles));
            })
            .catch(err => {
                dispatch(fetchArticlesFailure(err));
            });
    };
}

export function fetchSingleArticle(id) {
    return function (dispatch) {
        const getURL = `${ROOT}/articles`;
        dispatch(fetchArticlesRequest());
        axios
            .get(getURL)
            .then(res => {
                dispatch(fetchArticlesSuccess(res.data.articles.filter(value => {
                    return value._id === id;
                })));
            })
            .catch(err => {
                dispatch(fetchArticlesFailure(err));
            });
    };
}

export function fetchArticlesRequest() {
    return {
        type: types.FETCH_ARTICLES_REQUEST,
    };
}

export function fetchArticlesFailure(payload) {
    return {
        type: types.FETCH_ARTICLES_FAILURE,
        payload: payload
    };
}

export function fetchArticlesSuccess(payload) {
    return {
        type: types.FETCH_ARTICLES_SUCCESS,
        payload: payload
    };
}

export function changeCommentVisability(payload) {
    return {
        type: types.CHANGE_COMMENT_VISABIlITY,
        payload: payload
    };
}

