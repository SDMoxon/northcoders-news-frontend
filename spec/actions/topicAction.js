import { expect } from 'chai';
import * as topicActions from '../../src/actions/topicActions';
import * as types from '../../src/types';


describe('Topics Actions', () => {
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