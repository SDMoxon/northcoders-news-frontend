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

export function fetchComments () {
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

export function fetchTopics () {
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