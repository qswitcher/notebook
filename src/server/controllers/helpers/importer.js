const CCTransaction = require('../../models/cc_transaction');
const ObjectId = require('mongodb').ObjectId;
const { AMEX, CITI } = require('../../constants/credit_cards');
const async = require('async');

const mappers = {
    [CITI]: (row) => {
        console.log(row);
        let credit = row['Credit'] || '0';
        let debit = row['Debit'] || '0';
        let amount = credit - debit;
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
        let x = {
            date,
            amount,
            description,
            creditCardType: AMEX
        };
        console.log(x);
        return x;
    }
};

module.exports.dbInserter = (creditCardType, data, callback) => {
    // send to DB
    const transactionSaveTasks = data.map((row) => {
        return (cb) => {
            const transaction = new CCTransaction(mappers[creditCardType](row));
            transaction.save((err) => {
                if (err) { return cb(err) }
                return cb(null, transaction);
            });
        };
    });

    async.parallel(transactionSaveTasks, callback);
};
