import * as types from '../types';
import axios from 'axios';

export function fetchCommentsRequest () {
	return {
		type: types.FETCH_COMMENTS_REQUEST,
	};
}

export function fetchCommentsFailure (payload) {
	return {
		type: types.FETCH_COMMENTS_FAILURE,
		payload: payload
	};
}

export function fetchCommentsSuccess (payload) {
	return {
		type: types.FETCH_COMMENTS_SUCCESS,
		payload: payload
	};
}

