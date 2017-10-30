import { expect } from 'chai';
import { fetchCommentsRequest, fetchCommentsSuccess, fetchCommentsFailure, changeNewCommentVisibility, handelNewCommentInput, resetCommentState } from '../../src/actions/commentActions';
import { initialState, commentsReducer } from '../../src/reducers/commentsReducer';

describe.only('COMMENTS REDUCER', () => {
    describe('action: fetchComments', () => {
        it('should update the state correctly for fetchComments', () => {
            const action = fetchCommentsRequest();
            const newState = commentsReducer(initialState, action);
            expect(initialState).to.not.equal(newState);
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
            expect(initialState).to.not.equal(newState);
            expect(newState.comments).to.eql(exp);
        });
        it('should update the state correctly for fetchCommentsFailure', () => {
            const action = fetchCommentsFailure('error');
            const newState = commentsReducer(initialState, action);
            expect(initialState).to.not.equal(newState);
        });
    });
    describe('changeNewCommentVisibility', () => {
        it('should update commentVisable to true from false', () => {
            const action = changeNewCommentVisibility();
            const newState = commentsReducer(initialState, action);
            expect(initialState).to.not.equal(newState);
            expect(newState.newCommentVisible).be.true;
        });
    });
    describe('handelNewCommentInput', () => {
        it('should change the newComent input to reflect change', () => {
            const action = handelNewCommentInput('This is an input');
            const newState = commentsReducer(initialState,action);
            expect(initialState).to.not.equal(newState);
            expect(newState.newCommentInput).equal('This is an input');
        });
    });
    describe('resetCommentState', () => {
        it('should reset the comment state on submit and cancel', () => {
            const prevState = {
                newCommentInput:'this shouldn\'t be here!'
            };
            const action = resetCommentState();
            const newState = commentsReducer(prevState,action);
            expect(initialState).to.not.equal(newState);
            expect(newState.newCommentInput).equal('');
        });
    });
});