import { expect } from 'chai';
import * as articleActions from '../../src/actions/articleActions';
import * as types from '../../src/types';


describe('Articles Actions', () => {
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
    describe('articleAlterVotes', () => {
        describe('articleAlterVotesRequest', () => {
            it('returns object with correct payload', () => {
                const payload = 'up';
                expect(articleActions.articleAlterVotesRequest(payload)).to.eql({
                    type: types.ARTICLE_ALTER_VOTES_REQUEST,
                });
            });
        });
        describe('articleAlterVotesSuccess', () => {
            it('returns object with correct payload', () => {
                const payload = {
                    articleId:12345
                };
                expect(articleActions.articleAlterVotesSuccess(payload)).to.eql({
                    type: types.ARTICLE_ALTER_VOTES_SUCCESS,
                    payload: payload
                });
            });
        });
        describe('articleAlterVotesFailure', () => {
            it('returns object with correct payload', () => {
                const payload = 'Error!';
                expect(articleActions.articleAlterVotesFailure(payload)).to.eql({
                    type: types.ARTICLE_ALTER_VOTES_FAILURE,
                    payload: payload
                });
            });
        });
    });
});