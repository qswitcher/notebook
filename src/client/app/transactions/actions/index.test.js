import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './index';
import * as types from './types';
import { expect } from 'chai';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('#updateTransaction', () => {

    it('updates the transaction and fetches updated transactions', () => {
        const transaction = {
            _id: 1,
            category: 'My Category',
            date: '2017-04-19'
        };

        mock.onPut('/api/transactions/1', transaction)
            .reply(200, { body: { success: true }})
            .onGet('/api/transactions?year=2017&month=4')
            .reply(200, [transaction])

        const expectedActions = [
          { type: types.FETCH_TRANSACTIONS, payload: [transaction] }
        ]
        const store = mockStore({ todos: [] })
        return store.dispatch(actions.updateTransaction(transaction))
          .then(() => { // return of async actions
            expect(store.getActions()).to.eql(expectedActions)
        });
    })
});

describe('#fetchStatistics', () => {
    it('returns statistics', () => {
        mock.onGet('/api/transactions/statistics?year=2021')
            .reply(200, {stats: true})

        const expectedActions = [
          { type: types.FETCH_STATISTICS, payload: {stats: true} }
        ]
        const store = mockStore({ todos: [] })
        return store.dispatch(actions.fetchStatistics({
            year: 2021
        }))
          .then(() => { // return of async actions
            expect(store.getActions()).to.eql(expectedActions)
        });
    });
});
