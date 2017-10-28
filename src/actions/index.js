import * as types from '../types';
import axios from 'axios';

export function fetchArticles () {
	return {
		type: types.FETCH_ARTICLES_REQUEST,
	};
}

export function fetchArticlesFailure (payload) {
	return {
		type: types.FETCH_ARTICLES_FAILURE,
		payload: payload
	};
}

export function fetchArticlesSuccess (payload) {
	return {
		type: types.FETCH_ARTICLES_SUCCESS,
		payload: payload
	};
}