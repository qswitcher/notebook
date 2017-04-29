const expect = require('chai').expect;
const assert = require('chai').assert;

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../../src/server/app');
const Categories = require('../../../src/server/constants/categories');
const CategoryMapping = require('../../../src/server/models/category_mapping');
const CCTransaction = require('../../../src/server/models/cc_transaction');

describe('Categories controller', () => {
    describe('#create', () => {
        beforeEach((done) => {
            new CCTransaction({
                date: Date.parse('2016-05-10'),
                amount: 100,
                description: 'Home Depot',
                creditCardType: 'Citi'
            }).save()
                .then(() => {
                    request(app)
                     .post('/api/mappings')
                     .send({
                         value: 'Home Depot',
                         category: Categories.HOME_IMPROVEMENT
                     })
                     .expect(200)
                     .end(function(error, res) {
                         if (error) {
                             assert.ifError(error);
                             done();
                             return;
                         }
                         done();
                     });
                })
                .catch(err => {
                    assert.ifError(err);
                    done();
                });
        });

        it('creates a mapping', (done) => {
             CategoryMapping.findOne({value: 'Home Depot'})
               .then(mapping => {
                   expect(mapping).not.to.be.undefined;
                   expect(mapping.value).to.eq('Home Depot');
                   expect(mapping.category).to.eq(Categories.HOME_IMPROVEMENT);
                   done();
               })
                .catch(err => {
                    assert.ifError(err);
                    done();
                });
        });

        it('updates CC transactions with matching descriptions', (done) => {
            request(app)
             .post('/api/mappings')
             .send({
                 value: 'Home Depot',
                 category: Categories.HOME_IMPROVEMENT
             })
             .expect(200)
             .end(function(error, res) {
                 if (error) {
                     assert.ifError(error);;
                     done();
                     return;
                 }

                 CCTransaction.findOne({description: 'Home Depot'})
                   .then(transaction => {
                       expect(transaction).not.to.be.undefined;
                       expect(transaction.description).to.eq('Home Depot');
                       expect(transaction.category).to.eq(Categories.HOME_IMPROVEMENT);
                       done();
                   })
                    .catch(err => {
                        assert.ifError(err);;
                        done();
                    });
             });
        });
    });
});
