const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../../src/server/app');
const CCTransaction = require('../../../src/server/models/cc_transaction');
const fs = require('fs');
const path = require('path');

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
            new CCTransaction({
                date: Date.parse('2016-05-10'),
                amount: -100,
                description: 'AUTOPAY 999990000055374RAUTOPAY AUTO-PMT',
                creditCardType: 'Citi'
            }).save().then(() => {
                request(app)
                    .get('/api/transactions/statistics?year=2016')
                    .end((err, response) => {
                        expect(response.body[2]).to.deep.eq({
                            date: '2016-03',
                            sum: '1.00',
                            amazon: '0.00',
                            amex: '1.00',
                            citi: '0.00',
                            discover: '0.00',
                            marriott: '0.00'
                        })
                        expect(response.body[3]).to.deep.eq({
                            date: '2016-04',
                            sum: '1.00',
                            amazon: '0.00',
                            amex: '1.00',
                            citi: '0.00',
                            discover: '0.00',
                            marriott: '0.00'
                        })
                        expect(response.body[4]).to.deep.eq({
                            date: '2016-05',
                            sum: '5.50',
                            amazon: '0.00',
                            amex: '2.10',
                            citi: '3.40',
                            discover: '0.00',
                            marriott: '0.00'
                        });
                        done();
                    });
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

    describe('#import', () => {
        describe('CITI bank upload', () => {
            it('happy path', (done) => {
                const citiPath = path.join(__dirname, '../../fixtures/citi_upload.csv');
                request(app)
                 .post('/api/transactions/import')
                 .attach('file', citiPath)
                 .type('form')
                 .field({creditCardType: 'Citi'})
                 .expect(200)
                 .end(function(error, res){
                     const p1 = CCTransaction.findOne({description: 'THE HOME DEPOT #0509   AUSTIN        TX'});
                     const p2 = CCTransaction.findOne({description: 'NEST LABS              08554696378   CA'});
                     Promise.all([p1, p2])
                        .then(transactions => {
                            const t1 = transactions[0];
                            const t2 = transactions[1];
                            expect(t1.amount).to.eq(155.72);
                            expect(t1.date.toISOString().split('T')[0]).to.eq('2017-03-13')
                            expect(t1.creditCardType).to.eq('Citi');

                            expect(t2.amount).to.eq(-376.71);
                            expect(t2.date.toISOString().split('T')[0]).to.eq('2017-03-15')
                            expect(t2.creditCardType).to.eq('Citi');
                            done();
                        })
                        .catch(err => {
                            console.log(err);
                            throw err;
                        });
                 });
             });
        });

        describe('Amex bank upload', () => {
            it('happy path', (done) => {
                const citiPath = path.join(__dirname, '../../fixtures/amex_upload.csv');
                request(app)
                 .post('/api/transactions/import')
                 .attach('file', citiPath)
                 .type('form')
                 .field({creditCardType: 'Amex'})
                 .expect(200)
                 .end(function(error, res){
                     const p1 = CCTransaction.findOne({description: 'WHOLE FOODS MARKET - AUSTIN, TX'});
                     const p2 = CCTransaction.findOne({description: 'AUTOPAY PAYMENT RECEIVED - THANK YOU'});
                     Promise.all([p1, p2])
                        .then(transactions => {
                            const t1 = transactions[0];
                            const t2 = transactions[1];
                            expect(t1.amount).to.eq(21.64);
                            expect(t1.date.toISOString().split('T')[0]).to.eq('2017-03-31')
                            expect(t1.creditCardType).to.eq('Amex');

                            expect(t2.amount).to.eq(-1000.34);
                            expect(t2.date.toISOString().split('T')[0]).to.eq('2017-03-30')
                            expect(t2.creditCardType).to.eq('Amex');
                            done();
                        })
                        .catch(err => {
                            console.log(err);
                            throw err;
                        });
                 });
             });
        });
    });
});
