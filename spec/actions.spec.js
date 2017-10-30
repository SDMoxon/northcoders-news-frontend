import { expect } from 'chai';
import * as articleActions from '../src/actions/articleActions';
import * as topicActions from '../src/actions/topicActions';
import * as commentActions from '../src/actions/commentActions';
import * as types from '../src/types';

describe('actions', () => {
    //  Articles Actions
    describe('fetchArticles', () => {
        it('should return the correct action for fetchArticles', () => {
            expect(articleActions.fetchArticlesRequest()).to.eql({
                type: types.FETCH_ARTICLES_REQUEST
            });
        });
        it('should return the correct action for fetchArticlesSuccess', () => {
            const payload = 123456;
            expect(articleActions.fetchArticlesSuccess(payload)).to.eql({
                type: types.FETCH_ARTICLES_SUCCESS,
                payload: payload
            });
        });
        it('should return the correct action for fetchArticlesFailure', () => {
            const error = 'error';
            expect(articleActions.fetchArticlesFailure(error)).to.eql({
                type: types.FETCH_ARTICLES_FAILURE,
                payload: error
            });
        });
    });
    describe('changeCommentVisability', () => {
        it('should return the correct id', () => {
            const articleId = 'A12345678910';
            expect(articleActions.changeCommentVisibility(articleId)).to.eql({
                type: types.CHANGE_COMMENT_VISIBILITY,
                payload: articleId
            });
        });
    });
    //  Comments Actions
    describe('fetchComments', () => {
        it('should return the correct action for fetchComments', () => {
            expect(commentActions.fetchCommentsRequest()).to.eql({
                type: types.FETCH_COMMENTS_REQUEST
            });
        });
        it('should return the correct action for fetchCommentsSuccess', () => {
            const payload = 123456;
            expect(commentActions.fetchCommentsSuccess(payload)).to.eql({
                type: types.FETCH_COMMENTS_SUCCESS,
                payload: payload
            });
        });
        it('should return the correct action for fetchCommentsFailure', () => {
            const error = 'error';
            expect(commentActions.fetchCommentsFailure(error)).to.eql({
                type: types.FETCH_COMMENTS_FAILURE,
                payload: error
            });
        });
    });
    //  Topics Actions
    describe('fetchTopics', () => {
        it('should return the correct action for fetchTopics', () => {
            expect(topicActions.fetchTopicsRequest()).to.eql({
                type: types.FETCH_TOPICS_REQUEST
            });
        });
        it('should return the correct action for fetchTopicsSuccess', () => {
            const payload = 123456;
            expect(topicActions.fetchTopicsSuccess(payload)).to.eql({
                type: types.FETCH_TOPICS_SUCCESS,
                payload: payload
            });
        });
        it('should return the correct action for fetchTopicsFailure', () => {
            const error = 'error';
            expect(topicActions.fetchTopicsFailure(error)).to.eql({
                type: types.FETCH_TOPICS_FAILURE,
                payload: error
            });
        });
    });
});