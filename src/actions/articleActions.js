import * as types from '../types';
import axios from 'axios';
const URL = 'http://localhost:3080/';



export function fetchArticlesRequest () {
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

