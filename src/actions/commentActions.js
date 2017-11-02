import * as types from '../types';
import axios from 'axios';
import { ROOT } from '../config';

export function fetchAllComments(id) {
	return function (dispatch) {
		dispatch(fetchCommentsRequest());
		axios
			.get(`${ROOT}/articles/${id}/comments`)
			.then((res) => {
				setTimeout(() => {
					dispatch(fetchCommentsSuccess(res.data.comments));
				}, 1000);

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
export function changeNewCommentVisibility() {
	return {
		type: types.CHANGE_NEW_COMMENT_VISIBILITY,
	};
}
export function handelNewCommentInput(payload) {
	return {
		type: types.HANDLE_NEW_COMMENT_INPUT,
		payload: payload
	};
}
export function resetCommentState() {
	return {
		type: types.RESET_COMMENT_STATE,
	};
}

export function postComment(id, data) {
	return function (dispatch) {
		dispatch(postCommentRequest());
		axios
			.post(`${ROOT}/articles/${id}/comments`, data)
			.then((res) => {

				dispatch(postCommentSuccess(res.data));
			})
			.catch((err) => {
				dispatch(postCommentFailure(err));
			});
	};

}

export function postCommentRequest() {
	return {
		type: types.POST_COMMENTS_REQUEST,

	};
}
export function postCommentSuccess(payload) {
	return {
		type: types.POST_COMMENTS_SUCCESS,
		payload: payload
	};
}
export function postCommentFailure(error) {
	return {
		type: types.POST_COMMENTS_FAILURE,
		payload: error

	};
}


export function commentAlterVotes(id, vote) {
	console.log('fired');
	return function (dispatch) {
		dispatch(commentAlterVotesRequest());
		axios
			.put(`${ROOT}/comments/${id}?vote=${vote}`)
			.then(() => {
				dispatch(commentAlterVotesSuccess({ _id: id, vote: vote }));
			})
			.catch((err) => {
				console.log(err.message);
				dispatch(commentAlterVotesFailure(err));
			});
	};

}

export function commentAlterVotesRequest() {
	return {
		type: types.COMMENT_ALTER_VOTES_REQUEST,
	};
}

export function commentAlterVotesSuccess(payload) {
	return {
		type: types.COMMENT_ALTER_VOTES_SUCCESS,
		payload: payload
	};
}

export function commentAlterVotesFailure(payload) {
	return {
		type: types.COMMENT_ALTER_VOTES_FAILURE,
		payload: payload
	};
}