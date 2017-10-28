import * as types from '../types';
import axios from 'axios';

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

