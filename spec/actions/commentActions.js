import { expect } from 'chai';
import * as commentActions from '../../src/actions/commentActions';
import * as types from '../../src/types';

describe('Comments Actions', () => {
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
    describe('changeNewCommentVisability', () => {
        it('should return the correct action', () => {
            expect(commentActions.changeNewCommentVisibility()).to.eql({
                type: types.CHANGE_NEW_COMMENT_VISIBILITY
            });
        });
    });
    describe('action: Post Comment', () => {
        it('should return the correct action for request', () => {
            expect(commentActions.postCommentRequest()).to.eql({
                type: types.POST_COMMENTS_REQUEST
            });
        });

        it('should return the correct action for success', () => {
            const payload = {}
            expect(commentActions.postCommentSuccess(payload)).to.eql({
                type: types.POST_COMMENTS_SUCCESS,
                payload: payload
            });
        });

        it('should return the correct action for failure', () => {
            const error = 'error'
            expect(commentActions.postCommentFailure(error)).to.eql({
                type: types.POST_COMMENTS_FAILURE,
                payload: error
            });
        });
    });
    describe('handelNewCommentInput', () => {
        it('should return the correct action', () => {
            const payload = 'i am some kind of text';
            expect(commentActions.handelNewCommentInput(payload)).to.eql({
                type: types.HANDLE_NEW_COMMENT_INPUT,
                payload: payload
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
    describe.only('commentAlterVotes', () => {
        describe('commentAlterVotesRequest', () => {
            it('returns object with correct payload', () => {
                const payload = 'up';
                expect(commentActions.commentAlterVotes(payload)).to.eql({
                    type: types.COMMENT_ALTER_VOTESR_Request,
                });
            });
        });
        describe('commentAlterVotesSuccess', () => {
            it('returns object with correct payload', () => {
                const payload = {
                    commentId:12345
                };
                expect(commentActions.commentAlterVotesSuccess(payload)).to.eql({
                    type: types.COMMENT_ALTER_VOTES_SUCCESS,
                    payload: payload
                });
            });
        });
        describe('commentAlterVotesFailure', () => {
            it('returns object with correct payload', () => {
                const payload = 'Error!';
                expect(commentActions.commentAlterVotesFailure(payload)).to.eql({
                    type: types.COMMENT_ALTER_VOTES_FAILURE,
                    payload: payload
                });
            });
        });
    });
});