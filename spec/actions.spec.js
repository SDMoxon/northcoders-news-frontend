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
});