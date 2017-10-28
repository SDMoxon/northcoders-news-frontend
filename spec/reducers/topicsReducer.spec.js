import {expect} from 'chai';
import {fetchTopicsRequest, fetchTopicsSuccess, fetchTopicsFailure} from '../../src/actions/topicActions';
import {initialState, topicsReducer} from '../../src/reducers/topicsReducer';

describe('TOPICS REDUCER', () => {
    describe('action: fetchTopics', () => {
        it('should update the state correctly for fetchTopics', () => {
            const action = fetchTopicsRequest();
            const newstate = topicsReducer(initialState, action);
            expect(initialState).to.not.eql(newstate);
        });
        it('should update the state correctly for fetchTopicsSuccess', () => {
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
            const action = fetchTopicsSuccess(data);
            const newstate = topicsReducer(initialState, action);
            expect(initialState).to.not.eql(newstate);
            expect(newstate.topics).to.eql(exp);
        });
        it('should update the state correctly for fetchTopicsFailure', () => {
            const action = fetchTopicsFailure('error');
            const newstate = topicsReducer(initialState, action);
            expect(initialState).to.not.eql(newstate);
        });
    });
});