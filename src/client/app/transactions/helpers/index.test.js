import { expect } from 'chai'
import chai from 'chai'
import { computeStatistics } from './index'
import Categories from '../../../../server/constants/categories'
import chaiSubset from 'chai-subset'
chai.use(chaiSubset)

describe('#computeStatistics', () => {
    it('computes transaction statistics', () => {
        const transactions = [
            {
                category: Categories.CAR,
                amount: 1.2
            },
            { 
                category: Categories.CAR,
                amount: 2
            },
            {
                category: Categories.GROCERIES,
                amount: 2.5
            }
        ];
        
        expect(computeStatistics(transactions)).to.containSubset({
            CAR: 3.2,
            GROCERIES: 2.5
        });
    });
});