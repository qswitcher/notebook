import { expect } from 'chai';
import chai from 'chai';
import reducers from './reducers';
import { computeStatistics } from './reducers';
import Categories from '../../../server/constants/categories';
import chaiSubset from 'chai-subset';
chai.use(chaiSubset);


// describe('Transaction reducer', () => {
//     // it('sets initial state', () => {
//     //     const state = reducers(undefined, 'foo');
//     //     expect(state.currentMonth).to.eql(new Date().getMonth() + 1);
//     //     expect(state.currentYear).to.eql(new Date().getFullYear());
//     // });
// });
