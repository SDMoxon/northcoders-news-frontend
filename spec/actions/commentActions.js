import { expect } from 'chai';
import * as commentActions from '../../src/actions/commentActions';
import * as types from '../../src/types';

describe.only ('Comments Actions', () => {
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
        describe('changeNewCommentVisability', () => {
            it('should return the correct action', () => {
                expect(commentActions.changeNewCommentVisibility()).to.eql({
                    type: types.CHANGE_NEW_COMMENT_VISIBILITY
                });
            });
        });
        describe('handleNewCommentSubmit', () => {
            it('should return the correct action', () => {
                expect(commentActions.handleNewCommentSubmit()).to.eql({
                    type: types.HANDLE_NEW_COMMENT_SUBMIT
                });
            });
        });
        describe('handelNewCommentInput', () => {
            it('should return the correct action', () => {
                const payload = 'i am some kind of text';
                expect(commentActions.handelNewCommentInput(payload)).to.eql({
                    type: types.HANDLE_NEW_COMMENT_INPUT,
                    payload:payload
                });
            });
        });
        describe('resetCommentState', () => {
            it('should return the correct action', () => {
                expect(commentActions.resetCommentState()).to.eql({
                    type: types.RESET_COMMENT_STATE
                });
            });
        });
    });
});