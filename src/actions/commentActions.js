import * as types from '../types';
import axios from 'axios';
const ROOT = 'http://localhost:3080/api';

export function fetchAllComments(id) {
	return function (dispatch) {
		dispatch(fetchCommentsRequest());
		axios
			.get(`${ROOT}/articles/${id}/comments`)
			.then((res) => {
				console.log(res);
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






export function handleNewCommentSubmit() {

}

export function postCommentRequest() {
    return {
        type: types.POST_COMMENTS_REQUEST,
 
    };
}
export function postCommentSuccess(payload) {
    return {
        type: types.POST_COMMENTS_SUCCESS,
		payload:payload
    };
}
export function postCommentFailure(error) {
    return {
		type: types.POST_COMMENTS_FAILURE,
		payload: error
 
    };
}