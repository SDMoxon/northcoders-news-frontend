import {expect} from 'chai';
import {fetchArticlesRequest, fetchArticlesSuccess, fetchArticlesFailure} from '../../src/actions/articleActions';
import {initialState, articlesReducer} from '../../src/reducers/articlesReducer';

describe('ARTICLES REDUCER', () => {
    describe('action: fetchArticles', () => {
        it('should update the state correctly for fetchArticles', () => {
            const action = fetchArticlesRequest();
            const newstate = articlesReducer(initialState, action);
            expect(initialState).to.not.eql(newstate);
        });
        it('should update the state correctly for fetchArticlesSuccess', () => {
            const data = [
                { _id: 30, title: 'coding' },
                { _id: 12, title: 'cooking' },
                { _id: 122, title: 'football' }
                  ];
              const exp = {
                '30': { _id: 30, title: 'coding' },
                '12': { _id: 12, title: 'cooking' },
                '122': { _id: 122, title: 'football' }
              };
            const action = fetchArticlesSuccess(data);
            const newstate = articlesReducer(initialState, action);
            expect(initialState).to.not.eql(newstate);
            expect(newstate.articles).to.eql(exp);
        });
        it('should update the state correctly for fetchArticlesFailure', () => {
            const action = fetchArticlesFailure('error');
            const newstate = articlesReducer(initialState, action);
            expect(initialState).to.not.eql(newstate);
        });
    });
});