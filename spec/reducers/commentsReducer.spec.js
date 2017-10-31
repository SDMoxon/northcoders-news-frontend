import { expect } from 'chai';
import {
    fetchCommentsRequest,
    fetchCommentsSuccess,
    fetchCommentsFailure,
    changeNewCommentVisibility,
    handelNewCommentInput,
    resetCommentState,
    postCommentSuccess,
    postCommentFailure,
    postCommentRequest,
    commentAlterVotesRequest,
    commentAlterVotesSuccess,
    commentAlterVotesFailure

} from '../../src/actions/commentActions';
import { initialState, commentsReducer } from '../../src/reducers/commentsReducer';

describe('COMMENTS REDUCER', () => {
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
            const newState = commentsReducer(initialState, action);
            expect(initialState).to.not.equal(newState);
            expect(newState.newCommentInput).equal('This is an input');
        });
        it('should delete the corect part of the input to reflect change', () => {
            const prevState = {
                newCommentInput: 'This is an input'
            };
            const action = handelNewCommentInput('This is an inpu');
            const newState = commentsReducer(prevState, action);
            expect(initialState).to.not.equal(newState);
            expect(newState.newCommentInput).equal('This is an inpu');
        });
    });
    describe('resetCommentState', () => {
        it('should reset the comment state on submit and cancel', () => {
            const prevState = {
                newCommentInput: 'this shouldn\'t be here!'
            };
            const action = resetCommentState();
            const newState = commentsReducer(prevState, action);
            expect(initialState).to.not.equal(newState);
            expect(newState.newCommentInput).equal('');
        });
    });
    describe('post Comment', () => {
        it('should change sending to true when requesting', () => {
            const action = postCommentRequest();
            const newState = commentsReducer(initialState, action);

            expect(initialState).to.not.equal(newState);
            expect(newState.sending).be.true;
        });
        it('should add new comment when successful', () => {
            const action = postCommentSuccess({
                body: 'body',
                _id: '1234',
                user: 'McTestison'
            });
            const newState = commentsReducer(initialState, action);
            expect(initialState).to.not.equal(newState);
            expect(newState.comments).eql({
                1234: {
                    body: 'body',
                    _id: '1234',
                    user: 'McTestison'
                }
            });
        });
        it('should change sending to false when successful', () => {
            const action = postCommentSuccess({
                body: 'body',
                _id: '1234',
                user: 'McTestison'
            });
            const prevState = {
                comments: {},
                sending: true
            }
            const newState = commentsReducer(prevState, action);

            expect(initialState).to.not.equal(newState);
            expect(newState.sending).be.false;
        });
        it('should update error when failed', () => {
            const error = 'error!';
            const action = postCommentFailure(error);
            const newState = commentsReducer(initialState, action);
            expect(initialState).to.not.equal(newState);
            expect(newState.error).equal('error!');
        });
        it('should change sending to false when failed', () => {
            const error = 'error!';
            const prevState = {
                comments: {},
                sending: true
            }
            const action = postCommentFailure(error)
            const newState = commentsReducer(prevState, action);

            expect(initialState).to.not.equal(newState);
            expect(newState.sending).be.false;
        });
    });
    describe('alterCommentVotes', () => {
        it('sets sending to true when action is alterCommentVotesRequest', () => {
            const action = commentAlterVotesRequest();
            const newState = commentsReducer(initialState, action);
            expect(initialState).to.not.equal(newState);
            expect(newState.sending).to.be.true;
        });

        it('increases the count of comment votes when alterCommentVotesSuccess is given', () => {
            const payload = {
                _id: 12345,
                vote: 'up'

            };
            const prevState = {
                comments: {
                    12345: {
                        votes: 0,
                        body: 'this is a thing'
                    }
                }
            }
            const action = commentAlterVotesSuccess(payload);
            const newState = commentsReducer(prevState, action);
            expect(initialState).to.not.equal(newState);
            expect(newState.sending).be.false;
            expect(newState.comments[12345].votes).equal(prevState.comments[12345].votes + 1);
        });
        it('adds an error if alterCommentVotesSuccess called', () => {
            const payload = {
                error: 'ERROR'

            };
            const action = commentAlterVotesFailure(payload);
            const newState = commentsReducer(initialState, action);
            expect(initialState).to.not.equal(newState);
            expect(newState.sending).be.false;
            expect(newState.error).equal('ERROR');
        });
    });
});