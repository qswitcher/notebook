const CCTransaction = require('../../models/cc_transaction');
const ObjectId = require('mongodb').ObjectId;
const { AMEX, CITI } = require('../../constants/credit_cards');
const async = require('async');

const mappers = {
    [CITI]: (row) => {
        let credit = row['Credit'] || '0';
        let debit = row['Debit'] || '0';
        let amount = debit - credit;
        return {
            date: row['Date'],
            amount,
            description: row['Description'],
            creditCardType: CITI
        };
    },
    [AMEX]: (row) => {
        let amount = row[7];
        let date = Date.parse(row[0].split(/\s+/)[0]);
        let description = row[2];
        return {
            date,
            amount,
            description,
            creditCardType: AMEX
        };
    }
};

module.exports.dbInserter = (creditCardType, data, callback) => {
    // send to DB
    const transactionSaveTasks = data.map((row) => (cb) => {
        const transaction = new CCTransaction(mappers[creditCardType](row));
        transaction.save((err) => {
            if (err) { return cb(err) }
            return cb(null, transaction);
        });
    });

    async.parallel(transactionSaveTasks, callback);
};
