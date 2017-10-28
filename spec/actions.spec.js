import { expect } from 'chai';
import * as actions from '../src/actions';
import * as types from '../src/types';



describe('actions', () => {
    describe('fetchArticles', () => {
        it('should return the correct action for fetchArticles', () => {
            expect(actions.fetchArticles()).to.eql({
                type: types.FETCH_ARTICLES_REQUEST
            });
        });
        it('should return the correct action for fetchArticlesSuccess', () => {
            const payload = 123456;
            expect(actions.fetchArticlesSuccess(payload)).to.eql({
                type: types.FETCH_ARTICLES_SUCCESS,
               payload: payload
            });
        });
        it('should return the correct action for fetchArticlesFailure', () => {
            const error = 'error';
            expect(actions.fetchArticlesFailure(error)).to.eql({
                type: types.FETCH_ARTICLES_FAILURE,
                payload: error
            });
        });
    });
    describe('fetchComments', () => {
        it('should return the correct action for fetchComments', () => {
            expect(actions.fetchComments()).to.eql({
                type: types.FETCH_COMMENTS_REQUEST
            });
        });
        it('should return the correct action for fetchCommentsSuccess', () => {
            const payload = 123456;
            expect(actions.fetchCommentsSuccess(payload)).to.eql({
                type: types.FETCH_COMMENTS_SUCCESS,
               payload: payload
            });
        });
        it('should return the correct action for fetchCommentsFailure', () => {
            const error = 'error';
            expect(actions.fetchCommentsFailure(error)).to.eql({
                type: types.FETCH_COMMENTS_FAILURE,
                payload: error
            });
        });
    });
    describe('fetchTopics', () => {
        it('should return the correct action for fetchTopics', () => {
            expect(actions.fetchTopics()).to.eql({
                type: types.FETCH_TOPICS_REQUEST
            });
        });
        it('should return the correct action for fetchTopicsSuccess', () => {
            const payload = 123456;
            expect(actions.fetchTopicsSuccess(payload)).to.eql({
                type: types.FETCH_TOPICS_SUCCESS,
               payload: payload
            });
        });
        it('should return the correct action for fetchTopicsFailure', () => {
            const error = 'error';
            expect(actions.fetchTopicsFailure(error)).to.eql({
                type: types.FETCH_TOPICS_FAILURE,
                payload: error
            });
        });
    });
});