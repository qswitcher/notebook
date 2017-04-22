const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../../src/server/app');
const CCTransaction = require('../../../src/server/models/cc_transaction');

describe('CCTransactions controller', () => {
    it('pases', () => {
        expect(true).to.eq(true);
    });
    beforeEach((done) => {
        const todayTransaction = new CCTransaction({
            date: new Date(),
            amount: 123,
            description: 'A charge',
            creditCardType: 'Amex'
        });
        const march2016 = new CCTransaction({
            date: Date.parse('2016-03-02'),
            amount: 1,
            description: 'March charge',
            creditCardType: 'Amex'
        });
        const april2016 = new CCTransaction({
            date: Date.parse('2016-04-02'),
            amount: 1,
            description: 'April charge',
            creditCardType: 'Amex'
        });
        const may2016_1 = new CCTransaction({
            date: Date.parse('2016-05-02'),
            amount: 2.1,
            description: 'May charge',
            creditCardType: 'Amex'
        });
        const may2016_2 = new CCTransaction({
            date: Date.parse('2016-05-03'),
            amount: 3.4,
            description: 'May charge #2',
            creditCardType: 'Citi'
        });
        Promise.all([todayTransaction.save(), march2016.save(), april2016.save(), may2016_1.save(), may2016_2.save()])
            .then((values) => {
                done();
            })
            .catch(err => {
                console.warn('something went wrong');
                throw err;
            });
    });

    describe('#statistics', () => {
        it('returns statistics for given year', (done) => {
            request(app)
                .get('/api/transactions/statistics?year=2016')
                .end((err, response) => {
                    expect(response.body[2]).to.deep.eq({
                        date: '2016-03',
                        sum: 1,
                        amazon: 0,
                        amex: 1,
                        citi: 0,
                        discover: 0,
                        marriott: 0
                    })
                    expect(response.body[3]).to.deep.eq({
                        date: '2016-04',
                        sum: 1,
                        amazon: 0,
                        amex: 1,
                        citi: 0,
                        discover: 0,
                        marriott: 0
                    })
                    expect(response.body[4]).to.deep.eq({
                        date: '2016-05',
                        sum: 5.5,
                        amazon: 0,
                        amex: 2.1,
                        citi: 3.4,
                        discover: 0,
                        marriott: 0
                    });
                    done();
                });
        });
    });

    describe('#list', () => {
        it('should return all transactions', (done) => {
            request(app)
                .get('/api/transactions')
                .end((err, response) => {
                    expect(response.body.length).to.eq(1);

                    const transaction = response.body[0];
                    expect(transaction.amount).to.eq(123);
                    expect(transaction.description).to.eq('A charge');
                    expect(transaction.creditCardType).to.eq('Amex');
                    expect(transaction.date).to.match(/\d{4}-\d{2}-\d{2}/);
                    done();
                });
        });

        it('should return only transactions for given month', (done) => {
            request(app)
                .get('/api/transactions?month=4&year=2016')
                .end((err, response) => {
                    expect(response.body.length).to.eq(1);

                    const transaction = response.body[0];
                    expect(transaction.amount).to.eq(1);
                    expect(transaction.description).to.eq('April charge');
                    expect(transaction.creditCardType).to.eq('Amex');
                    expect(transaction.date).to.eq('2016-04-02');
                    done();
                });
        });
    });
});
