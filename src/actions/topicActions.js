import * as types from '../types';
import axios from 'axios';
const ROOT = 'http://localhost:3080/';

export function fetchAllTopics () {
    return function (dispatch) {
        dispatch(fetchTopicsRequest());
        axios
            .get(`${ROOT}/topics`)
            .then(res => {
                dispatch(fetchTopicsSuccess(res.data.topics));
            })
            .catch(err => {
                dispatch(fetchTopicsFailure(err));
            });
    };
}

export function fetchTopicsRequest () {
	return {
		type: types.FETCH_TOPICS_REQUEST,
	};
}

export function fetchTopicsFailure (payload) {
	return {
		type: types.FETCH_TOPICS_FAILURE,
		payload: payload
	};
}

export function fetchTopicsSuccess (payload) {
	return {
		type: types.FETCH_TOPICS_SUCCESS,
		payload: payload
	};
}

