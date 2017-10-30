import { expect } from 'chai';
import { fetchCommentsRequest, fetchCommentsSuccess, fetchCommentsFailure, changeNewCommentVisibility } from '../../src/actions/commentActions';
import { initialState, commentsReducer } from '../../src/reducers/commentsReducer';

describe('COMMENTS REDUCER', () => {
    describe('action: fetchComments', () => {
        it('should update the state correctly for fetchComments', () => {
            const action = fetchCommentsRequest();
            const newState = commentsReducer(initialState, action);
            expect(initialState).to.not.eql(newState);
        });
        it('should update the state correctly for fetchCommentsSuccess', () => {
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
            const action = fetchCommentsSuccess(data);
            const newState = commentsReducer(initialState, action);
            expect(initialState).to.not.eql(newState);
            expect(newState.comments).to.eql(exp);
        });
        it('should update the state correctly for fetchCommentsFailure', () => {
            const action = fetchCommentsFailure('error');
            const newState = commentsReducer(initialState, action);
            expect(initialState).to.not.eql(newState);
        });
    });
    describe('changeNewCommentVisibility', () => {
        it('should update commentVisable to true from false', () => {
            const action = changeNewCommentVisibility();
            const newState = commentsReducer(initialState, action);
            expect(initialState).to.not.eql(newState);
            expect(newState.newCommentVisible).be.true;
        });
    });
});