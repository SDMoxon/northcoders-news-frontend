import * as types from '../types';
import axios from 'axios';
const ROOT = 'http://localhost:3080/api';

export function fetchAllComments(id) {
	return function (dispatch) {
		dispatch(fetchCommentsRequest());
		axios
			.get(`${ROOT}/articles/${id}/comments`)
			.then((res) => {
				dispatch(fetchCommentsSuccess(res.data.comments));
			})
			.catch((err) => {
				dispatch(fetchCommentsFailure(err));
			});
	};
}


export function fetchCommentsRequest() {
	return {
		type: types.FETCH_COMMENTS_REQUEST,
	};
}

export function fetchCommentsFailure(payload) {
	return {
		type: types.FETCH_COMMENTS_FAILURE,
		payload: payload
	};
}

export function fetchCommentsSuccess(payload) {
	return {
		type: types.FETCH_COMMENTS_SUCCESS,
		payload: payload
	};
}

